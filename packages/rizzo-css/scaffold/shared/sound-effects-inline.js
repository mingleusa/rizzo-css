// Sound effects: play on click/tap when user has enabled (localStorage soundEffects === 'true'). Uses /assets/sfx/click.mp3 (or relative assets/sfx for Vanilla), then click.wav fallback, else Web Audio fallback. Single source for main site (Layout.astro) and all shipped scaffolds (Astro, Svelte, Vanilla); keep behavior in sync. Includes nav links and logo (a[href], .navbar__link, .navbar__brand-link). Supports touch (touchend) so mobile plays like desktop.
(function() {
	var SOUND_KEY = 'soundEffects';
	var THROTTLE_MS = 120;
	var clickableSelector = 'a[href], area[href], button, input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], input[type="reset"], select, summary, [role="button"], [role="link"], [role="menuitem"], [role="menuitemradio"], [role="tab"], [role="option"], [role="switch"], .btn, .tabs__tab, .dropdown__trigger, .accordion__trigger, [data-accordion-trigger], .navbar__link, .navbar__brand-link, .pagination__link, .breadcrumb__link, .search__trigger, .theme-switcher__option, .font-switcher__option, .framework-switcher__segment, .modal__close, .alert__close, .copy-btn, [data-copy-btn], [data-sound-on-click]';
	var audioContext = null;
	var soundBase = '/assets/sfx';
	var soundUrls = [soundBase + '/click.mp3', soundBase + '/click.wav'];
	var cachedAudio = null;
	var soundLoadTried = false;
	var lastPlayedAt = 0;
	var lastTouchSoundTarget = null;
	var lastTouchSoundTime = 0;
	function getContext() {
		if (!audioContext && typeof window.AudioContext !== 'undefined') {
			audioContext = new window.AudioContext();
		}
		return audioContext;
	}
	function playFallbackTone() {
		try {
			var ctx = getContext();
			if (!ctx) return;
			ctx.resume().then(function() {
				var now = ctx.currentTime;
				var osc = ctx.createOscillator();
				var gain = ctx.createGain();
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.frequency.setValueAtTime(800, now);
				osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
				osc.type = 'sine';
				gain.gain.setValueAtTime(0.08, now);
				gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
				osc.start(now);
				osc.stop(now + 0.04);
			}).catch(function() {});
		} catch (e) {}
	}
	function tryLoadAssetSound() {
		if (soundLoadTried || cachedAudio) return;
		soundLoadTried = true;
		var idx = 0;
		function tryNext() {
			if (idx >= soundUrls.length) return;
			var a = new window.Audio(soundUrls[idx]);
			a.volume = 0.4;
			a.addEventListener('canplaythrough', function() { cachedAudio = a; }, { once: true });
			a.addEventListener('error', function() { idx++; tryNext(); }, { once: true });
			a.load();
		}
		tryNext();
	}
	function playClickSound() {
		try {
			if (localStorage.getItem(SOUND_KEY) !== 'true') return;
			var now = Date.now();
			if (now - lastPlayedAt < THROTTLE_MS) return;
			lastPlayedAt = now;
			tryLoadAssetSound();
			if (cachedAudio) {
				try {
					cachedAudio.currentTime = 0;
					cachedAudio.volume = 0.4;
					cachedAudio.play().catch(function() {});
				} catch (e) {}
				return;
			}
			playFallbackTone();
		} catch (e) {}
	}
	function getClickable(el) {
		if (!el || !el.closest) return null;
		var clickable = el.closest(clickableSelector);
		if (!clickable) return null;
		if (clickable.disabled === true || clickable.getAttribute('aria-disabled') === 'true') return null;
		return clickable;
	}
	function onDocumentClick(e) {
		if (e.button !== 0) return;
		var clickable = getClickable(e.target);
		if (!clickable) return;
		if (lastTouchSoundTarget === clickable && (Date.now() - lastTouchSoundTime) < 400) return;
		playClickSound();
	}
	function onDocumentTouchend(e) {
		var clickable = getClickable(e.target);
		if (!clickable) return;
		lastTouchSoundTarget = clickable;
		lastTouchSoundTime = Date.now();
		playClickSound();
		setTimeout(function() { lastTouchSoundTarget = null; }, 450);
	}
	function initSound() {
		document.addEventListener('click', onDocumentClick, true);
		if ('ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0)) {
			document.addEventListener('touchend', onDocumentTouchend, true);
		}
		if (localStorage.getItem(SOUND_KEY) === 'true') tryLoadAssetSound();
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSound);
	} else {
		initSound();
	}
})();
