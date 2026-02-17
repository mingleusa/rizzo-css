// Sound effects: play on click when user has enabled (localStorage soundEffects === 'true'). Uses /assets/sfx/click.mp3, else Web Audio fallback. Same script for docs and all shipped scaffolds.
(function() {
	var SOUND_KEY = 'soundEffects';
	var THROTTLE_MS = 120;
	var clickableSelector = 'a[href], area[href], button, input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], input[type="reset"], select, summary, [role="button"], [role="link"], [role="menuitem"], [role="menuitemradio"], [role="tab"], [role="option"], [role="switch"], .btn, .tabs__tab, .dropdown__trigger, .accordion__trigger, [data-accordion-trigger], .navbar__link, .navbar__brand-link, .pagination__link, .breadcrumb__link, .search__trigger, .theme-switcher__option, .font-switcher__option, .framework-switcher__segment, .modal__close, .alert__close, .copy-btn, [data-copy-btn]';
	var audioContext = null;
	var soundUrls = ['/assets/sfx/click.mp3', '/assets/sfx/click.wav', '/assets/sfx/click.ogg'];
	var cachedAudio = null;
	var soundLoadTried = false;
	var lastPlayedAt = 0;
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
	function isClickable(el) {
		if (!el || !el.closest) return false;
		var clickable = el.closest(clickableSelector);
		if (!clickable) return false;
		if (clickable.disabled === true || clickable.getAttribute('aria-disabled') === 'true') return false;
		return true;
	}
	function onDocumentClick(e) {
		if (e.button !== 0) return;
		if (!isClickable(e.target)) return;
		playClickSound();
	}
	function initSound() {
		document.addEventListener('click', onDocumentClick, true);
		if (localStorage.getItem(SOUND_KEY) === 'true') tryLoadAssetSound();
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSound);
	} else {
		initSound();
	}
})();
