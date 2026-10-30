// =========================================================
// Lucky Answer Group — main.js (Part 3)
// Vanilla JavaScript (no libraries except Leaflet for maps).
// Sections:
//   1. Helpers
//   2. Scroll-reveal animation + back-to-top button
//   3. Gallery lightbox (index.html)
//   4. Service data, search / filter / sort, modal (services.html)
//   5. FAQ accordion (services.html)
//   6. Form validation helpers
//   7. Enquiry form: validation + instant quote response (enquiry.html)
//   8. Contact form: validation + compiled email (contact.html)
//   9. Interactive Leaflet maps (contact.html)
// =========================================================
(function () {
    'use strict';

    /* ---------- 1. Helpers ---------- */
    var $ = function (sel, root) { return (root || document).querySelector(sel); };
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
    var page = document.body.getAttribute('data-page');

    // Escape user-supplied text before placing it in innerHTML (prevents script injection)
    function esc(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function rand(n) {
        return 'R' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    /* ---------- 2. Scroll-reveal animation + back-to-top ---------- */
    function initReveal() {
        var targets = $$('main section, .card, .portfolio-grid figure, .service-detail');
        if (!('IntersectionObserver' in window)) { return; }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        targets.forEach(function (el) {
            if (el.classList.contains('hero') || el.classList.contains('page-header')) { return; }
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    function initBackToTop() {
        var btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Back to top');
        btn.textContent = '↑';
        document.body.appendChild(btn);
        window.addEventListener('scroll', function () {
            btn.classList.toggle('show', window.scrollY > 400);
        });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- 3. Gallery lightbox ---------- */
    function initLightbox() {
        var imgs = $$('.portfolio-grid figure img');
        if (!imgs.length) { return; }

        var box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', 'Image gallery');
        box.innerHTML =
            '<button class="lightbox-close" aria-label="Close gallery">&times;</button>' +
            '<button class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
            '<img src="" alt="">' +
            '<p class="lightbox-caption"></p>' +
            '<p class="lightbox-counter"></p>' +
            '<button class="lightbox-next" aria-label="Next image">&#8250;</button>';
        document.body.appendChild(box);

        var bigImg = $('img', box), cap = $('.lightbox-caption', box), counter = $('.lightbox-counter', box);
        var closeBtn = $('.lightbox-close', box);
        var current = 0, opener = null;

        function show(i) {
            current = (i + imgs.length) % imgs.length;
            var src = imgs[current];
            bigImg.src = src.getAttribute('src');
            bigImg.alt = src.alt;
            var fc = src.parentNode.querySelector('figcaption');
            cap.textContent = fc ? fc.textContent : src.alt;
            counter.textContent = (current + 1) + ' / ' + imgs.length;
        }
        function open(i) {
            opener = document.activeElement;
            show(i);
            box.classList.add('open');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }
        function close() {
            box.classList.remove('open');
            document.body.style.overflow = '';
            if (opener) { opener.focus(); }
        }

        imgs.forEach(function (img, i) {
            img.tabIndex = 0;
            img.setAttribute('role', 'button');
            img.addEventListener('click', function () { open(i); });
            img.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
            });
        });
        closeBtn.addEventListener('click', close);
        $('.lightbox-prev', box).addEventListener('click', function () { show(current - 1); });
        $('.lightbox-next', box).addEventListener('click', function () { show(current + 1); });
        box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
        document.addEventListener('keydown', function (e) {
            if (!box.classList.contains('open')) { return; }
            if (e.key === 'Escape') { close(); }
            else if (e.key === 'ArrowLeft') { show(current - 1); }
            else if (e.key === 'ArrowRight') { show(current + 1); }
            else if (e.key === 'Tab') {
                // keep keyboard focus inside the dialog
                var f = $$('button', box);
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ---------- 4. Services: dynamic listing, search, filter, sort, modal ---------- */
    // Dynamic content: services are defined as data and rendered into the DOM by JavaScript.
    var SERVICES = [
        { id: 'coc', name: 'Certificate of Compliance (CoC) Inspection', cat: 'electrical', price: 1450, unit: 'per inspection',
          desc: 'Full inspection of your installation and a CoC issued once it passes.',
          points: ['Required when selling a property', 'Written fault list if it fails', 'Re-inspection after repairs'] },
        { id: 'db', name: 'Distribution Board (DB) Upgrade', cat: 'electrical', price: 4800, unit: 'from',
          desc: 'Replace an old DB board with modern breakers, earth-leakage and surge protection.',
          points: ['SANS-compliant board and breakers', 'Earth leakage protection', 'CoC issued on completion'] },
        { id: 'rewire', name: 'House Rewiring', cat: 'electrical', price: 2200, unit: 'per room',
          desc: 'Complete rewiring for older homes and renovations.',
          points: ['New cabling, plugs and lighting circuits', 'Minimal wall damage', 'CoC issued on completion'] },
        { id: 'fault', name: 'Electrical Fault-Finding Call-out', cat: 'electrical', price: 850, unit: 'per call-out',
          desc: 'Fast diagnosis of tripping breakers, power loss and faulty circuits.',
          points: ['Emergency call-outs across Gauteng', 'Fault explained before repair', 'Priority for contract clients'] },
        { id: 'ftth-home', name: 'FTTH Home Installation', cat: 'fibre', price: 1950, unit: 'per home',
          desc: 'Fibre-to-the-home installation from the boundary to a working, tested connection.',
          points: ['Cable routing and wall termination', 'ONT and router setup', 'Speed test on completion'] },
        { id: 'ftth-estate', name: 'Estate / Complex Fibre Rollout', cat: 'fibre', price: 1200, unit: 'per household',
          desc: 'Phased FTTH rollouts for estates and complexes after a site survey.',
          points: ['Site survey and project plan', 'Trenching, ducting and cabling coordination', 'Per-household activation'] },
        { id: 'splice', name: 'Fibre Splicing & Termination', cat: 'fibre', price: 650, unit: 'per splice point',
          desc: 'Precision splicing and termination in line with SANS 10198 guidelines.',
          points: ['Fusion splicing and loss testing', 'Patch panel termination', 'Test results supplied'] },
        { id: 'ont', name: 'Router & ONT Setup', cat: 'fibre', price: 450, unit: 'per setup',
          desc: 'Configure your Optical Network Terminal and router for a stable connection.',
          points: ['Wi-Fi placement advice', 'Secure configuration', 'Device handover and walkthrough'] },
        { id: 'fibre-fault', name: 'Fibre Fault Repair & Re-splicing', cat: 'fibre', price: 750, unit: 'per repair',
          desc: 'Diagnose and repair damaged or degraded fibre connections.',
          points: ['OTDR / power-meter fault location', 'Re-splicing of damaged cable', 'Quick turnaround'] },
        { id: 'maint-elec', name: 'Electrical Maintenance Contract', cat: 'maintenance', price: 1800, unit: 'per month',
          desc: 'Scheduled safety inspections and preventative maintenance for estates and businesses.',
          points: ['Scheduled inspections', 'Priority call-out response', 'Compliance records kept up to date'] },
        { id: 'maint-fibre', name: 'Fibre Network Health Check', cat: 'maintenance', price: 1200, unit: 'per visit',
          desc: 'Preventative check of your fibre network to avoid downtime.',
          points: ['Signal and loss testing', 'Cabling and enclosure inspection', 'Report with recommendations'] },
        { id: 'maint-custom', name: 'Custom Estate Maintenance Package', cat: 'maintenance', price: 3500, unit: 'per month',
          desc: 'A combined electrical and fibre plan built around your site size and needs.',
          points: ['One point of contact for both', 'Custom schedule', 'Monthly service report'] }
    ];
    var CAT_LABEL = { electrical: 'Electrical', fibre: 'Fibre (FTTH)', maintenance: 'Maintenance' };

    function initServices() {
        var list = $('#svc-list');
        if (!list) { return; }
        var search = $('#svc-search'), cat = $('#svc-category'), sort = $('#svc-sort'), count = $('#svc-count');

        function render() {
            var q = search.value.trim().toLowerCase();
            var items = SERVICES.filter(function (s) {
                var matchCat = cat.value === 'all' || s.cat === cat.value;
                var hay = (s.name + ' ' + s.desc + ' ' + CAT_LABEL[s.cat]).toLowerCase();
                return matchCat && (!q || hay.indexOf(q) !== -1);
            });
            items.sort(function (a, b) {
                if (sort.value === 'price-asc') { return a.price - b.price; }
                if (sort.value === 'price-desc') { return b.price - a.price; }
                return a.name.localeCompare(b.name);
            });

            list.innerHTML = '';
            items.forEach(function (s) {
                var card = document.createElement('article');
                card.className = 'card svc-card';
                card.innerHTML =
                    '<span class="tag">' + esc(CAT_LABEL[s.cat]) + '</span>' +
                    '<h3>' + esc(s.name) + '</h3>' +
                    '<p>' + esc(s.desc) + '</p>' +
                    '<p class="price">' + (s.unit === 'from' ? 'From ' : '') + rand(s.price) +
                    (s.unit === 'from' ? '' : ' <small>' + esc(s.unit) + '</small>') + '</p>';
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = 'View details';
                btn.addEventListener('click', function () { openModal(s, btn); });
                card.appendChild(btn);
                list.appendChild(card);
            });
            if (!items.length) {
                var empty = document.createElement('p');
                empty.className = 'no-results';
                empty.textContent = 'No services match "' + search.value + '". Try a different word or reset the category.';
                list.appendChild(empty);
            }
            count.textContent = 'Showing ' + items.length + ' of ' + SERVICES.length + ' services';
        }
        search.addEventListener('input', render);
        cat.addEventListener('change', render);
        sort.addEventListener('change', render);
        render();
    }

    // Modal ("quick view") built entirely with DOM manipulation
    var modalEl, modalOpener;
    function openModal(s, opener) {
        modalOpener = opener;
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.className = 'modal-backdrop';
            modalEl.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
                '<button class="modal-close" aria-label="Close details">&times;</button><div class="modal-body"></div></div>';
            document.body.appendChild(modalEl);
            modalEl.addEventListener('click', function (e) { if (e.target === modalEl) { closeModal(); } });
            $('.modal-close', modalEl).addEventListener('click', closeModal);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalEl.classList.contains('open')) { closeModal(); } });
        }
        $('.modal-body', modalEl).innerHTML =
            '<h2 id="modal-title">' + esc(s.name) + '</h2>' +
            '<p>' + esc(s.desc) + '</p><ul>' + s.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
            '<p class="price"><strong>' + (s.unit === 'from' ? 'From ' : '') + rand(s.price) + ' ' + (s.unit === 'from' ? '' : esc(s.unit)) + '</strong> (indicative, excl. VAT)</p>' +
            '<a class="cta-button" href="enquiry.html?service=' + (s.cat === 'fibre' ? 'ftth' : s.cat) + '">Get a quote</a>';
        modalEl.classList.add('open');
        $('.modal-close', modalEl).focus();
    }
    function closeModal() {
        modalEl.classList.remove('open');
        if (modalOpener) { modalOpener.focus(); }
    }

    /* ---------- 5. FAQ accordion ---------- */
    function initAccordion() {
        var triggers = $$('.accordion-trigger');
        triggers.forEach(function (t) {
            t.addEventListener('click', function () {
                var willOpen = t.getAttribute('aria-expanded') !== 'true';
                triggers.forEach(function (o) {   // only one panel open at a time
                    o.setAttribute('aria-expanded', 'false');
                    document.getElementById(o.getAttribute('aria-controls')).hidden = true;
                });
                if (willOpen) {
                    t.setAttribute('aria-expanded', 'true');
                    document.getElementById(t.getAttribute('aria-controls')).hidden = false;
                }
            });
        });
    }

    /* ---------- 6. Form validation helpers ---------- */
    var RULES = {
        name: function (v) {
            if (!v.trim()) { return 'Please enter your full name.'; }
            if (!/^[A-Za-z][A-Za-z\s'.\-]{1,59}$/.test(v.trim())) { return 'Use letters only (2–60 characters).'; }
            return '';
        },
        email: function (v) {
            if (!v.trim()) { return 'Please enter your email address.'; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) { return 'Enter a valid email, e.g. name@example.co.za.'; }
            return '';
        },
        phone: function (v) {
            if (!v.trim()) { return 'Please enter your phone number.'; }
            var d = v.replace(/[\s\-()]/g, '');
            if (!/^(\+27|0)[1-8][0-9]{8}$/.test(d)) { return 'Enter a valid South African number, e.g. 082 123 4567.'; }
            return '';
        },
        required: function (v) { return v ? '' : 'Please choose an option.'; },
        message: function (v) {
            if (v.trim().length < 10) { return 'Please write at least 10 characters.'; }
            if (v.length > 1000) { return 'Please keep your message under 1000 characters.'; }
            return '';
        },
        quantity: function (v) {
            var n = Number(v);
            if (!v || isNaN(n) || n < 1 || n > 500 || Math.floor(n) !== n) { return 'Enter a whole number from 1 to 500.'; }
            return '';
        }
    };

    // fields: [{ id, rule }]. Returns { validate(): bool }
    function attachValidation(form, fields) {
        fields.forEach(function (f) {
            var el = document.getElementById(f.id);
            var err = document.createElement('p');
            err.className = 'error-msg';
            err.id = f.id + '-error';
            err.setAttribute('aria-live', 'polite');
            el.insertAdjacentElement('afterend', err);
            el.setAttribute('aria-describedby', err.id);
            f.el = el; f.err = err;
            var check = function () { return checkField(f); };
            el.addEventListener('blur', check);
            el.addEventListener('input', function () { if (el.classList.contains('invalid')) { check(); } });
            el.addEventListener('change', check);
        });
        return {
            validate: function () {
                var firstBad = null;
                fields.forEach(function (f) { if (!checkField(f) && !firstBad) { firstBad = f.el; } });
                if (firstBad) { firstBad.focus(); }
                return !firstBad;
            }
        };
    }
    function checkField(f) {
        var msg = RULES[f.rule](f.el.value);
        f.err.textContent = msg;
        f.el.classList.toggle('invalid', !!msg);
        f.el.classList.toggle('valid', !msg);
        f.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
    }

    /* ---------- 7. Enquiry form ---------- */
    // Pricing model for the instant indicative quote
    var BASE = { electrical: 1450, ftth: 1950, maintenance: 1800, other: 0 };
    var LEAD_DAYS = { electrical: 3, ftth: 5, maintenance: 7, other: 5 };
    var PROPERTY_FACTOR = { residential: 1, estate: 1.3, commercial: 1.25 };
    var SERVICE_LABEL = {
        electrical: 'Electrical Installation / Fault-Finding', ftth: 'FTTH Fibre Installation',
        maintenance: 'Maintenance Contract', other: 'Other / Not Sure'
    };

    function addBusinessDays(date, days) {
        var d = new Date(date.getTime()), added = 0;
        while (added < days) {
            d.setDate(d.getDate() + 1);
            if (d.getDay() !== 0 && d.getDay() !== 6) { added++; }
        }
        return d;
    }

    function calculateQuote(data) {
        var qty = Number(data.quantity);
        var urgent = data.urgency === 'urgent';
        var lead = LEAD_DAYS[data.service] + (qty > 20 ? 5 : 0);
        if (urgent) { lead = 2; }
        var result = { date: addBusinessDays(new Date(), lead), lead: lead, needsSurvey: data.service === 'other' };
        if (data.service !== 'other') {
            var est = BASE[data.service] * qty * PROPERTY_FACTOR[data.property] * (urgent ? 1.25 : 1);
            result.low = est; result.high = est * 1.2;
        }
        return result;
    }

    // Simulated AJAX request: returns a Promise that resolves like a server reply would.
    // On a hosted site, replace the body with fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) }).
    function sendToServer(data) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({ ok: true, reference: 'LAG-' + Date.now().toString().slice(-6), quote: calculateQuote(data) });
            }, 900);
        });
    }

    function initEnquiry() {
        var form = $('#enquiry-form');
        if (!form) { return; }
        var out = $('#enquiry-response');

        // Pre-select service when arriving from a service "Get a quote" link
        var preset = new URLSearchParams(window.location.search).get('service');
        if (preset && SERVICE_LABEL[preset]) { $('#service-type').value = preset; }

        var v = attachValidation(form, [
            { id: 'full-name', rule: 'name' }, { id: 'email', rule: 'email' }, { id: 'phone', rule: 'phone' },
            { id: 'service-type', rule: 'required' }, { id: 'quantity', rule: 'quantity' }, { id: 'message', rule: 'message' }
        ]);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!v.validate()) { return; }
            var data = {
                name: $('#full-name').value.trim(), email: $('#email').value.trim(), phone: $('#phone').value.trim(),
                service: $('#service-type').value, property: $('#property-type').value,
                quantity: $('#quantity').value, urgency: $('#urgency').value, message: $('#message').value.trim()
            };
            var btn = $('button[type="submit"]', form);
            btn.disabled = true; btn.textContent = 'Sending…';
            out.hidden = false; out.className = 'form-response loading';
            out.innerHTML = '<p>Calculating your quote…</p>';

            sendToServer(data).then(function (res) {
                var q = res.quote;
                var dateStr = q.date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                var html = '<h2>Thank you, ' + esc(data.name.split(' ')[0]) + '! Your enquiry was received.</h2>' +
                    '<dl><dt>Reference</dt><dd>' + esc(res.reference) + '</dd>' +
                    '<dt>Service</dt><dd>' + esc(SERVICE_LABEL[data.service]) + '</dd>' +
                    '<dt>Property</dt><dd>' + esc(data.property) + ' (' + esc(data.quantity) + ' point(s)/household(s))</dd>';
                if (q.needsSurvey) {
                    html += '<dt>Estimate</dt><dd>We need a short site visit to price this job accurately.</dd>';
                } else {
                    html += '<dt>Indicative cost</dt><dd><strong>' + rand(q.low) + ' – ' + rand(q.high) + '</strong> (excl. VAT)</dd>';
                }
                html += '<dt>Earliest availability</dt><dd><strong>' + esc(dateStr) + '</strong>' +
                    (data.urgency === 'urgent' ? ' (urgent slot)' : '') + '</dd></dl>' +
                    '<p class="note">This is an estimate only. A consultant will confirm the final price and booking by email at ' +
                    esc(data.email) + ' within one business day.</p>';
                out.className = 'form-response';
                out.innerHTML = html;
                out.setAttribute('tabindex', '-1');
                out.focus();
                form.reset();
                $$('input, select, textarea', form).forEach(function (el) { el.classList.remove('valid', 'invalid'); });
                btn.disabled = false; btn.textContent = 'Submit Enquiry';
            });
        });
    }

    /* ---------- 8. Contact form ---------- */
    // The recipient of each compiled email is set here in code, per branch.
    var RECIPIENTS = {
        pretoria: 'pretoria@luckyanswergroup.co.za',
        johannesburg: 'jhb@luckyanswergroup.co.za'
    };

    function initContact() {
        var form = $('#contact-form');
        if (!form) { return; }
        var out = $('#contact-response');
        var v = attachValidation(form, [
            { id: 'contact-name', rule: 'name' }, { id: 'contact-email', rule: 'email' },
            { id: 'contact-message', rule: 'message' }
        ]);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!v.validate()) { return; }
            var name = $('#contact-name').value.trim();
            var email = $('#contact-email').value.trim();
            var branch = $('#contact-branch').value;
            var msg = $('#contact-message').value.trim();
            var to = RECIPIENTS[branch];
            var subject = 'Website message from ' + name + ' (' + branch.charAt(0).toUpperCase() + branch.slice(1) + ' branch)';
            var body = 'Hello Lucky Answer Group,\n\n' + msg + '\n\nKind regards,\n' + name + '\nReply to: ' + email;
            var mailto = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

            out.hidden = false; out.className = 'form-response';
            out.innerHTML = '<h2>Your email is ready, ' + esc(name.split(' ')[0]) + '</h2>' +
                '<p>Your message has been compiled for the <strong>' + esc(branch) + '</strong> branch. ' +
                'Your email app should open now. If it does not, use the button below.</p>' +
                '<pre><strong>To:</strong> ' + esc(to) + '\n<strong>Subject:</strong> ' + esc(subject) + '\n\n' + esc(body) + '</pre>' +
                '<a class="cta-button" href="' + esc(mailto) + '">Open in email app</a>';
            out.setAttribute('tabindex', '-1');
            out.focus();
            window.location.href = mailto;
        });
    }

    /* ---------- 9. Leaflet maps ---------- */
    function initMaps() {
        var branches = [
            { id: 'map-pretoria', name: 'Pretoria Branch', addr: '12 Jacaranda Street, Sunnyside, Pretoria', pos: [-25.7545, 28.2314] },
            { id: 'map-johannesburg', name: 'Johannesburg Branch', addr: '45 Empire Road, Parktown, Johannesburg', pos: [-26.1838, 28.0393] }
        ];
        branches.forEach(function (b) {
            var el = document.getElementById(b.id);
            if (!el) { return; }
            if (typeof L === 'undefined') {
                el.textContent = 'The map could not be loaded. Address: ' + b.addr;
                return;
            }
            var map = L.map(el, { scrollWheelZoom: false }).setView(b.pos, 14);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker(b.pos).addTo(map)
                .bindPopup('<strong>Lucky Answer Group — ' + b.name + '</strong><br>' + b.addr +
                    '<br><a href="https://www.openstreetmap.org/directions?to=' + b.pos[0] + ',' + b.pos[1] +
                    '" target="_blank" rel="noopener noreferrer">Get directions</a>')
                .openPopup();
        });
    }

    /* ---------- Start-up ---------- */
    initBackToTop();
    initReveal();
    if (page === 'index') { initLightbox(); }
    if (page === 'services') { initServices(); initAccordion(); }
    if (page === 'enquiry') { initEnquiry(); }
    if (page === 'contact') { initContact(); initMaps(); }
})();
