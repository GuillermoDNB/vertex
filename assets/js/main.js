/* ==========================================================
   METODOLOGÍA · pasos + treemap de beneficios
   Para editar textos o pesos, tocá solo el objeto METHOD.
   "weight" es el peso relativo del beneficio (define el
   tamaño del bloque en el treemap). No hace falta que sume 100.
   ========================================================== */

const METHOD = {

    datos: {
        step: 'Paso 1 de 4 · Datos',
        title: 'Sin datos confiables, cada decisión es una apuesta.',
        benefits: [
            {
                icon: 'fa-coins',
                title: 'Costos reales y actualizados',
                text: 'Con precios que se mueven todo el tiempo, saber cuánto te cuesta cada viaje, ruta o entrega te permite ajustar tarifas a tiempo y no trabajar a pérdida sin darte cuenta.',
                weight: 50
            },
            {
                icon: 'fa-boxes-stacked',
                title: 'Stock y trazabilidad confiables',
                text: 'Sabés qué hay, dónde está y en qué estado. Menos faltantes, menos mermas y menos reclamos de clientes.',
                weight: 28
            },
            {
                icon: 'fa-layer-group',
                title: 'Una sola fuente de verdad',
                text: 'Se terminan las planillas sueltas, los chats y los cuadernos: todo el equipo trabaja con el mismo dato.',
                weight: 22
            }
        ]
    },

    procesos: {
        step: 'Paso 2 de 4 · Procesos',
        title: 'Un proceso ordenado no depende de la memoria de nadie.',
        benefits: [
            {
                icon: 'fa-circle-check',
                title: 'Menos errores y retrabajo',
                text: 'Remitos, cargas y seguimientos se hacen igual cada vez. Menos errores de tipeo, menos devoluciones y menos horas rehaciendo tareas.',
                weight: 45
            },
            {
                icon: 'fa-clock',
                title: 'Tiempo para lo que suma',
                text: 'En equipos chicos donde cada persona hace de todo, automatizar libera horas para atender clientes y hacer crecer el negocio.',
                weight: 30
            },
            {
                icon: 'fa-people-group',
                title: 'Operación que no depende de una persona',
                text: 'Con el proceso documentado, una ausencia o un cambio de equipo no frena la operación.',
                weight: 25
            }
        ]
    },

    tecnologia: {
        step: 'Paso 3 de 4 · Tecnología',
        title: 'La tecnología correcta es la que tu pyme puede sostener.',
        benefits: [
            {
                icon: 'fa-wallet',
                title: 'Herramientas accesibles y a tu medida',
                text: 'No hace falta un sistema pensado para una multinacional. Armamos soluciones acordes al tamaño y al presupuesto de tu negocio, y crecen cuando vos crecés.',
                weight: 45
            },
            {
                icon: 'fa-plug',
                title: 'Se conecta con lo que ya usás',
                text: 'Planillas, mail, tienda online, facturación: integramos lo que ya tenés en lugar de empezar de cero.',
                weight: 33
            },
            {
                icon: 'fa-arrow-trend-up',
                title: 'Escalar sin sumar estructura',
                text: 'Más pedidos, clientes y rutas sin duplicar el equipo ni los costos fijos.',
                weight: 22
            }
        ]
    },

    decisiones: {
        step: 'Paso 4 de 4 · Decisiones',
        title: 'Decidir con información cambia el rumbo del negocio.',
        benefits: [
            {
                icon: 'fa-binoculars',
                title: 'Anticiparte en lugar de reaccionar',
                text: 'En un contexto cambiante, ver a tiempo la demanda, los costos y los desvíos te da margen para actuar antes de que el problema llegue.',
                weight: 45
            },
            {
                icon: 'fa-sack-dollar',
                title: 'Saber dónde está tu rentabilidad',
                text: 'Qué clientes, rutas o productos dejan margen y cuáles no. Enfocás el esfuerzo donde realmente rinde.',
                weight: 33
            },
            {
                icon: 'fa-scale-balanced',
                title: 'Respaldo para negociar y crecer',
                text: 'Con números claros negociás mejor con proveedores y clientes, y llegás mejor preparado a pedir financiamiento o sumar socios.',
                weight: 22
            }
        ]
    }

};


(function initMethod() {

    const tabs      = Array.from(document.querySelectorAll('.flow-step'));
    const panel     = document.getElementById('benefits');
    const stepLabel = document.getElementById('benefits-step');
    const title     = document.getElementById('benefits-title');
    const treemap   = document.getElementById('treemap');

    if (!tabs.length || !panel || !treemap) return;

    /* Un bloque del treemap */
    function tileHTML(b, index, size) {

        return `
            <article class="tile tile-${size}" style="--w:${b.weight}; --i:${index}">
                <i class="fa-solid ${b.icon}" aria-hidden="true"></i>
                <div>
                    <h4>${b.title}</h4>
                    <p>${b.text}</p>
                </div>
            </article>`;
    }

    /* Treemap de 3 bloques:
       el de mayor peso ocupa una columna completa y los otros dos
       se reparten la otra columna, así las áreas son proporcionales. */
    function renderTreemap(benefits) {

        const [a, b, c] = [...benefits].sort((x, y) => y.weight - x.weight);

        treemap.innerHTML =
            tileHTML(a, 0, 'main') +
            `<div class="treemap-col" style="--w:${b.weight + c.weight}">` +
                tileHTML(b, 1, 'sm') +
                tileHTML(c, 2, 'sm') +
            `</div>`;
    }

    function select(key, moveFocus) {

        const data = METHOD[key];
        if (!data) return;

        tabs.forEach(tab => {
            const active = tab.dataset.step === key;
            tab.setAttribute('aria-selected', active);
            tab.tabIndex = active ? 0 : -1;
            if (active && moveFocus) tab.focus();
        });

        panel.dataset.step = key;
        panel.setAttribute('aria-labelledby', 'tab-' + key);

        stepLabel.textContent = data.step;
        title.textContent = data.title;

        renderTreemap(data.benefits);
    }

    tabs.forEach((tab, i) => {

        tab.addEventListener('click', () => select(tab.dataset.step));

        /* Flechas del teclado para moverse entre pasos */
        tab.addEventListener('keydown', e => {

            let next = null;

            if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
            if (e.key === 'ArrowLeft')  next = (i - 1 + tabs.length) % tabs.length;
            if (e.key === 'Home')       next = 0;
            if (e.key === 'End')        next = tabs.length - 1;

            if (next !== null) {
                e.preventDefault();
                select(tabs[next].dataset.step, true);
            }
        });
    });

    select('datos');

})();


/* ==========================================================
   MENÚ HAMBURGUESA (celulares y tablets)
   ========================================================== */

(function initMenu() {

    const header = document.querySelector('.header');
    const toggle = document.querySelector('.nav-toggle');
    if (!header || !toggle) return;

    function setOpen(open) {
        header.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    toggle.addEventListener('click', () =>
        setOpen(!header.classList.contains('menu-open')));

    /* se cierra al elegir una sección */
    header.querySelectorAll('nav a, .btn-header').forEach(a =>
        a.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false);
    });

    /* si se agranda la ventana, vuelve al estado normal */
    window.matchMedia('(min-width: 1101px)')
        .addEventListener('change', e => { if (e.matches) setOpen(false); });

})();


/* ==========================================================
   IDEAS Y NOVEDADES · Tips (imágenes) + Proyectos (imágenes)
   Ambas pestañas son galerías de fotos (las mismas piezas que
   se suben a Instagram), con transición automática entre
   imágenes: pasan solas cada pocos segundos y la pestaña que
   no se está mirando queda pausada. Al pasar el mouse, tocar
   o navegar con el teclado, se pausa un rato y después retoma.
   Lee data/tips.json y data/proyectos.json.
   Cargá los archivos más nuevos ARRIBA de cada lista: el
   primer elemento del JSON es el primero que se muestra.
   Si un archivo no existe o está vacío, esa pestaña se oculta
   sola; si los dos están vacíos, toda la sección se oculta.
   ========================================================== */

(function initNovedades() {

    const wrap = document.getElementById('novedades-wrap');
    const navLink = document.getElementById('nav-novedades');
    if (!wrap) return;

    const tabs = Array.from(document.querySelectorAll('.news-tab'));

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = str == null ? '' : String(str);
        return d.innerHTML;
    }

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso + 'T00:00:00');
        if (isNaN(d)) return iso;
        return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    async function loadJSON(path) {
        try {
            const res = await fetch(path, { cache: 'no-store' });
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            return [];
        }
    }

    /* --- Carrusel genérico: flechas, barra de progreso y avance automático --- */
    function wireCarousel(trackId, prevId, nextId, thumbId, itemSelector) {

        const track = document.getElementById(trackId);
        const prev = document.getElementById(prevId);
        const next = document.getElementById(nextId);
        const thumb = document.getElementById(thumbId);
        if (!track) return null;

        const reduceMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const AUTOPLAY_MS = 4500;
        const RESUME_AFTER_MS = 7000;

        let autoplayTimer = null;
        let resumeTimer = null;
        let autoplayEnabled = false; // se activa cuando la pestaña está visible

        function update() {

            const items = Array.from(track.querySelectorAll(itemSelector));
            if (!items.length) return;

            const max = track.scrollWidth - track.clientWidth;

            if (prev) prev.disabled = max <= 0;
            if (next) next.disabled = max <= 0;

            if (thumb) {
                const visibleRatio = Math.min(1, track.clientWidth / track.scrollWidth);
                const progress = max > 0 ? track.scrollLeft / max : 0;
                thumb.style.width = Math.max(12, visibleRatio * 100) + '%';
                thumb.style.transform =
                    `translateX(${progress * (100 / Math.max(visibleRatio, 0.0001) - 100)}%)`;
            }
        }

        function cardWidth() {
            const card = track.querySelector(itemSelector);
            const gap = 22;
            return card ? card.getBoundingClientRect().width + gap : 300;
        }

        function step(dir) {

            const max = track.scrollWidth - track.clientWidth;

            // en los extremos, el paso siguiente/anterior da la vuelta (efecto de bucle)
            if (dir > 0 && track.scrollLeft >= max - 4) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
                return;
            }
            if (dir < 0 && track.scrollLeft <= 4) {
                track.scrollTo({ left: max, behavior: 'smooth' });
                return;
            }

            track.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
        }

        function stopAutoplay() {
            if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
        }

        function startAutoplay() {

            stopAutoplay();

            const items = track.querySelectorAll(itemSelector);
            if (reduceMotion || !autoplayEnabled || items.length < 2) return;

            autoplayTimer = setInterval(() => step(1), AUTOPLAY_MS);
        }

        /* al interactuar a mano, se pausa un rato y después retoma sola */
        function pauseAndResumeLater() {

            stopAutoplay();

            if (resumeTimer) clearTimeout(resumeTimer);
            resumeTimer = setTimeout(startAutoplay, RESUME_AFTER_MS);
        }

        prev && prev.addEventListener('click', () => { step(-1); pauseAndResumeLater(); });
        next && next.addEventListener('click', () => { step(1); pauseAndResumeLater(); });

        track.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') { e.preventDefault(); step(1); pauseAndResumeLater(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); pauseAndResumeLater(); }
        });

        // el mouse, el foco o el dedo pausan mientras el visitante mira esa tarjeta
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
        track.addEventListener('focusin', stopAutoplay);
        track.addEventListener('focusout', startAutoplay);
        track.addEventListener('touchstart', pauseAndResumeLater, { passive: true });
        track.addEventListener('pointerdown', pauseAndResumeLater);

        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay(); else startAutoplay();
        });

        update();

        return {
            update,
            enable() { autoplayEnabled = true; startAutoplay(); },
            disable() { autoplayEnabled = false; stopAutoplay(); if (resumeTimer) clearTimeout(resumeTimer); }
        };
    }

    /* --- Visor de imagen en grande, con navegación entre todas las
           imágenes de la pestaña que se esté mirando --- */
    const lightboxCtrl = (function setupLightbox() {

        const el = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        let items = [];
        let index = 0;

        function render() {
            if (!items.length) return;
            const item = items[index];

            img.classList.add('is-changing');

            setTimeout(() => {
                img.src = item.imagen;
                img.alt = item.titulo || '';
                caption.textContent = item.titulo || '';
                img.classList.remove('is-changing');
            }, 120);

            const multiple = items.length > 1;
            if (prevBtn) prevBtn.hidden = !multiple;
            if (nextBtn) nextBtn.hidden = !multiple;
        }

        function open(list, startIndex) {
            if (!el) return;
            items = list;
            index = startIndex;
            el.hidden = false;
            render();
        }

        function close() {
            if (!el) return;
            el.hidden = true;
        }

        function go(dir) {
            if (!items.length) return;
            index = (index + dir + items.length) % items.length;
            render();
        }

        closeBtn && closeBtn.addEventListener('click', close);
        prevBtn && prevBtn.addEventListener('click', () => go(-1));
        nextBtn && nextBtn.addEventListener('click', () => go(1));

        el && el.addEventListener('click', e => { if (e.target === el) close(); });

        document.addEventListener('keydown', e => {
            if (el && el.hidden) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        });

        return { open, isOpen: () => !(el && el.hidden) };
    })();

    /* --- Panel genérico de imágenes (Tips y Proyectos usan lo mismo) ---
       item: { imagen, titulo, descripcion, fecha, etiqueta, enlace, textoEnlace }
       square: true para posteos de Instagram (thumbnail 1:1) */
    function renderMediaPanel(trackId, panelId, items, square) {

        const track = document.getElementById(trackId);
        const panel = document.getElementById(panelId);
        if (!track || !panel) return false;

        if (!items.length) {
            track.innerHTML = `<p class="news-empty">${panel.dataset.emptyMsg}</p>`;
            return false;
        }

        const thumbClass = 'media-thumb' + (square ? ' media-thumb--square' : '');

        track.innerHTML = items.map((it, i) => `
            <article class="media-card" data-index="${i}">
                <div class="${thumbClass}">
                    <img src="${escapeHTML(it.imagen)}" alt="${escapeHTML(it.titulo || '')}" loading="lazy">
                </div>
                <div class="media-info">
                    ${it.fecha ? `<span class="media-date">${escapeHTML(formatDate(it.fecha))}</span>` : ''}
                    ${it.etiqueta ? `<span class="media-tag">${escapeHTML(it.etiqueta)}</span>` : ''}
                    ${it.titulo ? `<h3>${escapeHTML(it.titulo)}</h3>` : ''}
                    ${it.descripcion ? `<p>${escapeHTML(it.descripcion)}</p>` : ''}
                    ${it.enlace ? `<a class="media-link" href="${escapeHTML(it.enlace)}"
                        target="_blank" rel="noopener" onclick="event.stopPropagation()">
                        ${escapeHTML(it.textoEnlace || 'Ver posteo')} →</a>` : ''}
                </div>
            </article>
        `).join('');

        track.querySelectorAll('.media-card').forEach(card => {
            card.addEventListener('click', () => lightboxCtrl.open(items, +card.dataset.index));
        });

        return true;
    }

    function selectTab(name) {
        tabs.forEach(tab => {
            const active = tab.dataset.panel === name;
            tab.setAttribute('aria-selected', active);
        });
        document.getElementById('panel-tips').hidden = name !== 'tips';
        document.getElementById('panel-proyectos').hidden = name !== 'proyectos';

        // solo la pestaña visible avanza sola
        if (name === 'tips') {
            tipsCarousel && tipsCarousel.enable();
            proyectosCarousel && proyectosCarousel.disable();
        } else {
            proyectosCarousel && proyectosCarousel.enable();
            tipsCarousel && tipsCarousel.disable();
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => selectTab(tab.dataset.panel));
    });

    let tipsCarousel = null;
    let proyectosCarousel = null;

    (async function boot() {

        const [tips, proyectos] = await Promise.all([
            loadJSON('data/tips.json'),
            loadJSON('data/proyectos.json')
        ]);

        const hasTips = renderMediaPanel('tips-track', 'panel-tips', tips, true);
        const hasProyectos = renderMediaPanel('proyectos-track', 'panel-proyectos', proyectos, false);

        if (!hasTips && !hasProyectos) return; // sección queda oculta

        wrap.hidden = false;
        if (navLink) navLink.hidden = false;

        // pestañas: solo se muestran las que tienen contenido
        const tabTips = document.getElementById('tab-tips');
        const tabProyectos = document.getElementById('tab-proyectos');
        if (tabTips) tabTips.hidden = !hasTips;
        if (tabProyectos) tabProyectos.hidden = !hasProyectos;

        const wrapTabs = document.querySelector('.news-tabs');
        if (wrapTabs && (!hasTips || !hasProyectos)) wrapTabs.style.display = 'none';

        tipsCarousel = wireCarousel('tips-track', 'tips-prev', 'tips-next', 'tips-thumb', '.media-card');
        proyectosCarousel = wireCarousel('proyectos-track', 'proyectos-prev', 'proyectos-next', 'proyectos-thumb', '.media-card');

        selectTab(hasTips ? 'tips' : 'proyectos');

    })();

})();
