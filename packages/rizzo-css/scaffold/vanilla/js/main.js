/**
 * Rizzo CSS — Vanilla JS component bundle
 * Theme, toast, settings, tabs, modal, dropdown, accordion, search, navbar (mobile), copy-to-clipboard.
 * Load this script after the DOM (e.g. before </body>).
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // --- Toast (showToast, removeToast, removeAllToasts) ---
  if (!window.showToast) {
    function showToast(message, options) {
      if (!message) return null;
      options = options || {};
      var variant = options.variant || 'info';
      var position = options.position || 'top-right';
      var autoDismiss = options.autoDismiss !== undefined ? options.autoDismiss : 5000;
      var dismissible = options.dismissible !== undefined ? options.dismissible : true;
      var toastId = 'toast-' + Math.random().toString(36).substr(2, 9);
      function createToast() {
        if (!document.body) return;
        var containerId = 'toast-container-' + position;
        var container = document.getElementById(containerId);
        if (!container) {
          container = document.createElement('div');
          container.id = containerId;
          container.className = 'toast-container toast-container--' + position;
          container.style.cssText = 'display:flex;visibility:visible;z-index:1100;';
          document.body.appendChild(container);
        }
        var toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'alert alert--' + variant;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.style.cssText = 'display:flex;visibility:visible;opacity:0;transition:opacity 0.3s ease-out, transform 0.3s ease-out;';
        var isRight = position.indexOf('right') !== -1;
        var isLeft = position.indexOf('left') !== -1;
        toast.style.transform = isRight ? 'translateX(100%)' : isLeft ? 'translateX(-100%)' : 'translateY(-100%)';
        var content = document.createElement('div');
        content.className = 'alert__content';
        content.textContent = message;
        toast.appendChild(content);
        var closeBtn;
        if (dismissible) {
          closeBtn = document.createElement('button');
          closeBtn.type = 'button';
          closeBtn.className = 'alert__close';
          closeBtn.setAttribute('aria-label', 'Dismiss toast');
          closeBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="4" x2="12" y2="12"></line><line x1="12" y1="4" x2="4" y2="12"></line></svg>';
          toast.appendChild(closeBtn);
          closeBtn.addEventListener('click', function () {
            toast.style.opacity = '0';
            toast.style.transform = isRight ? 'translateX(100%)' : isLeft ? 'translateX(-100%)' : 'translateY(-100%)';
            setTimeout(function () {
              if (toast.parentNode) toast.remove();
              if (container.children.length === 0) container.remove();
            }, 300);
          });
        }
        container.appendChild(toast);
        requestAnimationFrame(function () {
          toast.offsetHeight;
          if (variant === 'warning') {
            toast.style.color = 'var(--warning-text)';
            content.style.color = 'var(--warning-text)';
            if (closeBtn) closeBtn.style.color = 'var(--warning-text)';
          }
          setTimeout(function () {
            requestAnimationFrame(function () {
              toast.style.opacity = '1';
              toast.style.transform = isRight || isLeft ? 'translateX(0)' : 'translateY(0)';
            });
          }, 10);
        });
        if (autoDismiss > 0) {
          setTimeout(function () {
            if (toast.parentNode) {
              toast.style.opacity = '0';
              toast.style.transform = isRight ? 'translateX(100%)' : isLeft ? 'translateX(-100%)' : 'translateY(-100%)';
              setTimeout(function () {
                if (toast.parentNode) toast.remove();
                if (container.children.length === 0) container.remove();
              }, 300);
            }
          }, autoDismiss);
        }
      }
      if (document.body) createToast();
      else document.addEventListener('DOMContentLoaded', createToast);
      return toastId;
    }
    function removeToast(toastId) {
      var toast = document.getElementById(toastId);
      if (toast) {
        var container = toast.parentElement;
        var position = container ? container.id.replace('toast-container-', '') : 'top-right';
        toast.style.opacity = '0';
        toast.style.transform = position.indexOf('right') !== -1 ? 'translateX(100%)' : position.indexOf('left') !== -1 ? 'translateX(-100%)' : 'translateY(-100%)';
        setTimeout(function () {
          if (toast.parentNode) toast.remove();
          if (container && container.classList.contains('toast-container') && container.children.length === 0) container.remove();
        }, 300);
      }
    }
    function removeAllToasts() {
      document.querySelectorAll('.toast-container').forEach(function (c) {
        c.querySelectorAll('.alert').forEach(function (t) {
          t.style.opacity = '0';
          t.style.transform = 'translateY(-10px)';
        });
        setTimeout(function () { c.remove(); }, 300);
      });
    }
    window.showToast = showToast;
    window.removeToast = removeToast;
    window.removeAllToasts = removeAllToasts;
  }

  // --- Theme (applyTheme, sync selects, system listener) ---
  var KEY = 'theme';
  var defaultDark = '{{DEFAULT_DARK}}';
  var defaultLight = '{{DEFAULT_LIGHT}}';
  function resolveSystem() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? defaultDark : defaultLight;
  }
  function applyTheme(value) {
    var effective = value === 'system' ? resolveSystem() : value;
    document.documentElement.setAttribute('data-theme', effective);
    try { localStorage.setItem(KEY, value); } catch (e) {}
    var headerSelect = document.getElementById('theme-select');
    var settingsSelect = document.getElementById('settings-theme');
    if (headerSelect && headerSelect.value !== value) headerSelect.value = value;
    if (settingsSelect && settingsSelect.value !== value) settingsSelect.value = value;
    try { window.dispatchEvent(new CustomEvent('rizzo-theme-change', { detail: { themeValue: value, effective: effective } })); } catch (e) {}
  }
  function syncThemeSelects() {
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    var currentAttr = document.documentElement.getAttribute('data-theme');
    var value = stored || currentAttr || 'system';
    var headerSelect = document.getElementById('theme-select');
    var settingsSelect = document.getElementById('settings-theme');
    if (headerSelect) headerSelect.value = value;
    if (settingsSelect) settingsSelect.value = value;
  }
  function initTheme() {
    var headerSelect = document.getElementById('theme-select');
    var settingsSelect = document.getElementById('settings-theme');
    if (headerSelect) headerSelect.addEventListener('change', function () { applyTheme(headerSelect.value); });
    if (settingsSelect) settingsSelect.addEventListener('change', function () { applyTheme(settingsSelect.value); });
    syncThemeSelects();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if ((localStorage.getItem(KEY) || 'system') === 'system') applyTheme('system');
    });
  }

  // --- Settings panel (openSettings, font size, reduce motion, high contrast, scrollbar) ---
  function initSettings() {
    var settings = document.querySelector('[data-settings]');
    if (!settings) return;
    var overlay = settings.querySelector('[data-settings-overlay]');
    var panel = settings.querySelector('.settings__panel');
    var closeBtn = settings.querySelector('[data-settings-close]');
    var fontSizeSlider = settings.querySelector('[data-font-size-slider]');
    var fontSizeValue = settings.querySelector('[data-font-size-value]');
    var fontPairSelect = settings.querySelector('[data-font-pair]');
    var reducedMotion = settings.querySelector('[data-reduced-motion]');
    var highContrast = settings.querySelector('[data-high-contrast]');
    var scrollbarStyleRadios = settings.querySelectorAll('[data-scrollbar-style]');
    var html = document.documentElement;
    if (!panel || !overlay || !closeBtn) return;
    function updateSliderProgress(slider) {
      var min = parseFloat(slider.min), max = parseFloat(slider.max), value = parseFloat(slider.value);
      slider.style.setProperty('--slider-progress', ((value - min) / (max - min)) * 100 + '%');
    }
    function applyFontSize(scale) {
      html.style.setProperty('--font-size-scale', scale);
      if (fontSizeValue) fontSizeValue.textContent = Math.round(scale * 100) + '%';
    }
    function applyScrollbarStyle(style) {
      html.classList.remove('scrollbar-thin', 'scrollbar-thick', 'scrollbar-hidden', 'hide-scrollbars');
      if (style === 'thick') html.classList.add('scrollbar-thick');
      else if (style === 'hidden') html.classList.add('scrollbar-hidden', 'hide-scrollbars');
    }
    function loadSettings() {
      var saved = localStorage.getItem('fontSizeScale');
      if (saved && fontSizeSlider) {
        fontSizeSlider.value = saved;
        applyFontSize(parseFloat(saved));
      }
      if (fontSizeSlider) updateSliderProgress(fontSizeSlider);
      var savedFontPair = localStorage.getItem('fontPair') || 'geist';
      if (fontPairSelect) {
        fontPairSelect.value = savedFontPair;
        var opt = fontPairSelect.options[fontPairSelect.selectedIndex];
        if (opt && opt.dataset.sans && opt.dataset.mono) {
          html.style.setProperty('--font-family', opt.dataset.sans);
          html.style.setProperty('--font-family-mono', opt.dataset.mono);
        }
      }
      if (reducedMotion) {
        reducedMotion.checked = localStorage.getItem('reducedMotion') === 'true';
        html.classList.toggle('reduced-motion', reducedMotion.checked);
      }
      if (highContrast) {
        highContrast.checked = localStorage.getItem('highContrast') === 'true';
        html.classList.toggle('high-contrast', highContrast.checked);
      }
      var scrollbar = localStorage.getItem('scrollbarStyle') || 'thin';
      for (var i = 0; i < scrollbarStyleRadios.length; i++) {
        if (scrollbarStyleRadios[i].value === scrollbar) scrollbarStyleRadios[i].checked = true;
      }
      applyScrollbarStyle(scrollbar);
    }
    function getFocusable(container) {
      var sel = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
      return Array.prototype.slice.call(container.querySelectorAll(sel));
    }
    var previousActive = null;
    function openSettings() {
      previousActive = document.activeElement;
      settings.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      panel.setAttribute('aria-hidden', 'false');
      panel.removeAttribute('data-open');
      void panel.offsetHeight;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.setAttribute('data-open', 'true');
          if (closeBtn) closeBtn.focus();
        });
      });
    }
    function closeSettings() {
      panel.removeAttribute('data-open');
      var duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;
      setTimeout(function () {
        settings.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        panel.setAttribute('aria-hidden', 'true');
        if (previousActive) {
          previousActive.focus();
          previousActive = null;
        }
      }, duration);
    }
    closeBtn.addEventListener('click', closeSettings);
    overlay.addEventListener('click', closeSettings);
    document.addEventListener('keydown', function (e) {
      if (panel.getAttribute('data-open') !== 'true') return;
      if (e.key === 'Escape') { e.preventDefault(); closeSettings(); return; }
      if (e.key === 'Tab') {
        var els = getFocusable(panel);
        if (els.length === 0) return;
        var first = els[0], last = els[els.length - 1], active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last || !panel.contains(active)) { e.preventDefault(); first.focus(); }
        }
      }
    });
    if (fontSizeSlider) {
      fontSizeSlider.addEventListener('input', function () {
        var scale = parseFloat(this.value);
        applyFontSize(scale);
        updateSliderProgress(this);
        localStorage.setItem('fontSizeScale', scale);
      });
    }
    if (fontPairSelect) {
      fontPairSelect.addEventListener('change', function () {
        var opt = this.options[this.selectedIndex];
        if (opt && opt.dataset.sans && opt.dataset.mono) {
          html.style.setProperty('--font-family', opt.dataset.sans);
          html.style.setProperty('--font-family-mono', opt.dataset.mono);
          localStorage.setItem('fontPair', opt.value);
        }
      });
    }
    if (reducedMotion) {
      reducedMotion.addEventListener('change', function () {
        html.classList.toggle('reduced-motion', this.checked);
        localStorage.setItem('reducedMotion', this.checked);
      });
    }
    if (highContrast) {
      highContrast.addEventListener('change', function () {
        html.classList.toggle('high-contrast', this.checked);
        localStorage.setItem('highContrast', this.checked);
      });
    }
    for (var j = 0; j < scrollbarStyleRadios.length; j++) {
      scrollbarStyleRadios[j].addEventListener('change', function () {
        if (this.checked) {
          applyScrollbarStyle(this.value);
          localStorage.setItem('scrollbarStyle', this.value);
        }
      });
    }
    loadSettings();
    window.openSettings = openSettings;
  }

  // --- Copy to clipboard: .copy-to-clipboard [data-copy-value] or [data-copy] with value ---
  function initCopyToClipboard() {
    function setupButton(btn) {
      if (btn.getAttribute('data-copy-inited') === 'true') return;
      btn.setAttribute('data-copy-inited', 'true');
      var host = btn.closest('.tooltip-host');
      var defaultTooltip = (host && host.getAttribute('data-tooltip')) || 'Copy to clipboard';
      if (host) host.setAttribute('data-copy-default-tooltip', defaultTooltip);
      var defaultAria = btn.getAttribute('aria-label') || 'Copy to clipboard';
      var getValue = function () { return btn.getAttribute('data-copy-value') || btn.getAttribute('value') || ''; };
      var getFormat = function () { return btn.getAttribute('data-copy-format') || ''; };
      var copyIcon = btn.querySelector('.copy-to-clipboard__icon--copy');
      var checkIcon = btn.querySelector('.copy-to-clipboard__icon--check');
      var feedback = btn.querySelector('.copy-to-clipboard__feedback');
      var textSpan = btn.querySelector('.copy-to-clipboard__text');
      function doCopy() {
        var value = getValue();
        if (!value && textSpan) value = textSpan.textContent || '';
        if (!value) return;
        function showSuccess() {
          if (copyIcon) copyIcon.classList.add('copy-to-clipboard__icon--hidden');
          if (checkIcon) checkIcon.classList.remove('copy-to-clipboard__icon--hidden');
          if (feedback) feedback.textContent = getFormat() ? 'Copied ' + getFormat() + '!' : 'Copied!';
          if (host) host.setAttribute('data-tooltip', getFormat() ? 'Copied ' + getFormat() + '!' : 'Copied!');
          btn.setAttribute('aria-label', getFormat() ? 'Copied ' + getFormat() + '!' : 'Copied!');
          var labelEl = btn.querySelector('.copy-trigger__text');
          var previousLabel = labelEl ? labelEl.textContent : '';
          if (labelEl) labelEl.textContent = 'Copied!';
          setTimeout(function () {
            if (copyIcon) copyIcon.classList.remove('copy-to-clipboard__icon--hidden');
            if (checkIcon) checkIcon.classList.add('copy-to-clipboard__icon--hidden');
            if (feedback) feedback.textContent = '';
            if (host) host.setAttribute('data-tooltip', host.getAttribute('data-copy-default-tooltip') || defaultTooltip);
            btn.setAttribute('aria-label', defaultAria);
            if (labelEl) labelEl.textContent = previousLabel || 'Copy';
          }, 2000);
        }
        if (typeof navigator.clipboard !== 'undefined' && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(showSuccess).catch(function () {
            try {
              var ta = document.createElement('textarea');
              ta.value = value;
              ta.style.position = 'fixed';
              ta.style.left = '-9999px';
              document.body.appendChild(ta);
              ta.focus();
              ta.select();
              document.execCommand('copy');
              document.body.removeChild(ta);
              showSuccess();
            } catch (e) {
              if (window.showToast) window.showToast('Failed to copy', { variant: 'warning' });
            }
          });
        } else {
          try {
            var ta = document.createElement('textarea');
            ta.value = value;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showSuccess();
          } catch (e) {
            if (window.showToast) window.showToast('Failed to copy', { variant: 'warning' });
          }
        }
      }
      btn.addEventListener('click', doCopy);
    }
    document.querySelectorAll('.copy-to-clipboard[data-copy-value], .copy-to-clipboard[data-copy], [data-copy]').forEach(setupButton);
  }

  // --- Tabs: init all [data-tabs] ---
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (tabsContainer) {
      if (tabsContainer.getAttribute('data-rizzo-tabs-inited')) return;
      tabsContainer.setAttribute('data-rizzo-tabs-inited', 'true');
      var tabButtons = tabsContainer.querySelectorAll('[role="tab"]');
      var tabPanels = tabsContainer.querySelectorAll('[role="tabpanel"]');
      if (tabButtons.length === 0 || tabPanels.length === 0) return;
      var activeIndex = -1;
      for (var i = 0; i < tabButtons.length; i++) {
        if (tabButtons[i].classList.contains('tabs__tab--active')) { activeIndex = i; break; }
      }
      if (activeIndex === -1) activeIndex = 0;
      function activateTab(index) {
        if (index < 0 || index >= tabButtons.length) return;
        var targetButton = tabButtons[index];
        var targetTabId = targetButton.getAttribute('data-tab-id');
        if (!targetTabId) return;
        for (var i = 0; i < tabButtons.length; i++) {
          var isActive = i === index;
          tabButtons[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
          tabButtons[i].setAttribute('tabindex', isActive ? '0' : '-1');
          tabButtons[i].classList.toggle('tabs__tab--active', isActive);
        }
        for (var p = 0; p < tabPanels.length; p++) {
          var panelId = tabPanels[p].getAttribute('data-panel-id');
          var isActive = panelId === targetTabId;
          tabPanels[p].setAttribute('aria-hidden', isActive ? 'false' : 'true');
          tabPanels[p].classList.toggle('tabs__panel--active', isActive);
        }
      }
      for (var i = 0; i < tabButtons.length; i++) {
        (function (idx) {
          tabButtons[idx].addEventListener('click', function () { activateTab(idx); });
          tabButtons[idx].addEventListener('keydown', function (e) {
            var targetIndex = idx;
            switch (e.key) {
              case 'ArrowRight':
              case 'ArrowDown':
                e.preventDefault();
                targetIndex = (idx + 1) % tabButtons.length;
                break;
              case 'ArrowLeft':
              case 'ArrowUp':
                e.preventDefault();
                targetIndex = idx === 0 ? tabButtons.length - 1 : idx - 1;
                break;
              case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
              case 'End':
                e.preventDefault();
                targetIndex = tabButtons.length - 1;
                break;
              case 'Enter':
              case ' ':
                e.preventDefault();
                activateTab(idx);
                return;
              default:
                return;
            }
            activateTab(targetIndex);
            tabButtons[targetIndex].focus();
          });
        })(i);
      }
    });
  }

  // --- Modal: [data-modal-open="modalId"] opens #modalId, #modalId-overlay, [data-modal-close] ---
  function initModals() {
    var inited = {};
    function initModal(modalId) {
      if (inited[modalId]) return;
      var modal = document.getElementById(modalId);
      var overlay = document.getElementById(modalId + '-overlay');
      if (!modal || !overlay) return;
      var closeBtn = modal.querySelector('[data-modal-close]');
      if (!closeBtn) return;
      inited[modalId] = true;
      modal.setAttribute('data-rizzo-modal-inited', 'true');
      var focusableSelectors = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
      function getFocusable(container) {
        return Array.prototype.slice.call(container.querySelectorAll(focusableSelectors));
      }
      var previousActive = null;
      var focusTrapHandler = null;
      function openModal() {
        previousActive = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');
        modal.setAttribute('data-open', 'true');
        var focusable = getFocusable(modal);
        var first = focusable.length ? focusable[0] : closeBtn;
        if (first) setTimeout(function () { first.focus(); }, 0);
        focusTrapHandler = function (e) {
          if (modal.getAttribute('data-open') !== 'true') return;
          if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
          if (e.key === 'Tab') {
            var els = getFocusable(modal);
            if (els.length === 0) return;
            var firstEl = els[0], lastEl = els[els.length - 1], active = document.activeElement;
            if (e.shiftKey) {
              if (active === firstEl || !modal.contains(active)) { e.preventDefault(); lastEl.focus(); }
            } else {
              if (active === lastEl || !modal.contains(active)) { e.preventDefault(); firstEl.focus(); }
            }
          }
        };
        document.addEventListener('keydown', focusTrapHandler);
      }
      function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('data-open');
        if (focusTrapHandler) {
          document.removeEventListener('keydown', focusTrapHandler);
          focusTrapHandler = null;
        }
        if (previousActive) { previousActive.focus(); previousActive = null; }
      }
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
      var idSafe = modalId.replace(/-/g, '_');
      window['openModal_' + idSafe] = openModal;
      window['closeModal_' + idSafe] = closeModal;
    }
    document.querySelectorAll('[data-modal-close]').forEach(function (closeBtn) {
      var modal = closeBtn.closest ? closeBtn.closest('[role="dialog"]') : null;
      if (modal && modal.id) initModal(modal.id);
    });
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      var modalId = btn.getAttribute('data-modal-open');
      if (!modalId) return;
      initModal(modalId);
      var openModalFn = window['openModal_' + modalId.replace(/-/g, '_')];
      if (openModalFn) btn.addEventListener('click', function () { openModalFn(); });
    });
  }

  // --- Dropdown: init all [data-dropdown] ---
  function initDropdowns() {
    var dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(function (dropdown) {
      var dropdownId = dropdown.getAttribute('data-dropdown');
      if (!dropdownId) return;
      if (dropdown.hasAttribute('data-dropdown-initialized')) return;
      dropdown.setAttribute('data-dropdown-initialized', 'true');
      var trigger = dropdown.querySelector('.dropdown__trigger');
      var menu = dropdown.querySelector('.dropdown__menu');
      var items = dropdown.querySelectorAll('.dropdown__item');
      var itemWrappers = dropdown.querySelectorAll('.dropdown__item-wrapper');
      if (!trigger || !menu) return;
      var currentIndex = -1;
      function getVisibleItems() {
        return Array.prototype.filter.call(items, function (item) {
          var disabled = item.getAttribute('aria-disabled') === 'true';
          var wrapper = item.closest('.dropdown__item-wrapper');
          var submenu = wrapper ? wrapper.querySelector('.dropdown__submenu') : null;
          if (submenu && item.closest('.dropdown__submenu')) return false;
          return !disabled && (item.offsetParent !== null || menu.classList.contains('dropdown__menu--open'));
        });
      }
      function closeAllSubmenus(exceptWrapper) {
        for (var w = 0; w < itemWrappers.length; w++) {
          if (itemWrappers[w] === exceptWrapper) continue;
          var sub = itemWrappers[w].querySelector('.dropdown__submenu');
          var it = itemWrappers[w].querySelector('.dropdown__item');
          if (sub && it) {
            sub.classList.remove('dropdown__submenu--open');
            sub.setAttribute('aria-hidden', 'true');
            it.setAttribute('aria-expanded', 'false');
          }
        }
      }
      function toggleSubmenu(wrapper, open) {
        var submenu = wrapper.querySelector('.dropdown__submenu');
        var item = wrapper.querySelector('.dropdown__item');
        if (!submenu || !item) return;
        var isOpen = open !== undefined ? open : submenu.classList.contains('dropdown__submenu--open');
        var willBeOpen = !isOpen;
        if (willBeOpen) {
          var parentSub = wrapper.closest('.dropdown__submenu');
          if (parentSub) {
            var siblings = parentSub.querySelectorAll('.dropdown__item-wrapper');
            for (var s = 0; s < siblings.length; s++) {
              if (siblings[s] === wrapper) continue;
              var sSub = siblings[s].querySelector('.dropdown__submenu');
              var sItem = siblings[s].querySelector('.dropdown__item');
              if (sSub && sItem) {
                sSub.classList.remove('dropdown__submenu--open');
                sSub.setAttribute('aria-hidden', 'true');
                sItem.setAttribute('aria-expanded', 'false');
              }
            }
          } else {
            closeAllSubmenus(wrapper);
          }
        }
        if (willBeOpen) {
          submenu.classList.add('dropdown__submenu--open');
          submenu.setAttribute('aria-hidden', 'false');
          item.setAttribute('aria-expanded', 'true');
        } else {
          submenu.classList.remove('dropdown__submenu--open');
          submenu.setAttribute('aria-hidden', 'true');
          item.setAttribute('aria-expanded', 'false');
        }
      }
      function toggleMenu(open) {
        var isOpen = open !== undefined ? open : menu.classList.contains('dropdown__menu--open');
        var willBeOpen = !isOpen;
        menu.classList.toggle('dropdown__menu--open', willBeOpen);
        trigger.setAttribute('aria-expanded', willBeOpen.toString());
        menu.setAttribute('aria-hidden', (!willBeOpen).toString());
        for (var i = 0; i < items.length; i++) items[i].setAttribute('tabindex', willBeOpen ? '0' : '-1');
        if (!willBeOpen) {
          trigger.focus();
          currentIndex = -1;
          closeAllSubmenus();
        } else {
          var vis = getVisibleItems();
          if (vis.length > 0) {
            currentIndex = 0;
            setTimeout(function () { vis[0].focus(); }, 0);
          }
        }
      }
      function closeMenu() {
        menu.classList.remove('dropdown__menu--open');
        trigger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < items.length; i++) items[i].setAttribute('tabindex', '-1');
        closeAllSubmenus();
        currentIndex = -1;
      }
      function handleOutsideClick(e) {
        if (e && e.target && !dropdown.contains(e.target)) {
          closeMenu();
          document.removeEventListener('click', handleOutsideClick);
        }
      }
      function wrappedToggle(open) {
        var was = menu.classList.contains('dropdown__menu--open');
        toggleMenu(open);
        var now = menu.classList.contains('dropdown__menu--open');
        if (now && !was) setTimeout(function () { document.addEventListener('click', handleOutsideClick); }, 0);
        else if (!now && was) document.removeEventListener('click', handleOutsideClick);
      }
      trigger.addEventListener('click', function () { wrappedToggle(undefined); });
      menu.addEventListener('click', function (e) {
        var target = e.target;
        var item = target.closest ? target.closest('.dropdown__item') : null;
        if (!item) return;
        e.stopPropagation();
        if (item.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
        var wrapper = item.closest('.dropdown__item-wrapper');
        if (wrapper) {
          var sub = wrapper.querySelector('.dropdown__submenu');
          if (sub) {
            e.preventDefault();
            e.stopImmediatePropagation();
            toggleSubmenu(wrapper, undefined);
            return;
          }
        }
        var href = item.getAttribute('data-dropdown-href');
        if (href) { window.location.href = href; }
        var onClick = item.getAttribute('data-dropdown-onclick');
        if (onClick && typeof window[onClick] === 'function') {
          var val = item.getAttribute('data-dropdown-value') || item.textContent.trim() || '';
          window[onClick](val);
        }
        closeMenu();
      });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          wrappedToggle(undefined);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          var vis = getVisibleItems();
          if (vis.length > 0) {
            currentIndex = 0;
            wrappedToggle(true);
            setTimeout(function () { vis[0].focus(); }, 0);
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          var vis = getVisibleItems();
          if (vis.length > 0) {
            currentIndex = vis.length - 1;
            wrappedToggle(true);
            setTimeout(function () { vis[currentIndex].focus(); }, 0);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeMenu();
        }
      });
      menu.addEventListener('keydown', function (e) {
        var vis = getVisibleItems();
        if (e.key === 'Escape') {
          e.preventDefault();
          closeMenu();
          trigger.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          currentIndex = (currentIndex + 1) % vis.length;
          vis[currentIndex].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          currentIndex = currentIndex <= 0 ? vis.length - 1 : currentIndex - 1;
          vis[currentIndex].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          currentIndex = 0;
          vis[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          currentIndex = vis.length - 1;
          vis[currentIndex].focus();
        } else if (e.key === 'ArrowRight') {
          var t = e.target;
          if (t && t.closest) {
            var w = t.closest('.dropdown__item-wrapper');
            if (w) {
              var sub = w.querySelector('.dropdown__submenu');
              if (sub) {
                e.preventDefault();
                toggleSubmenu(w, true);
                var first = sub.querySelector('.dropdown__item');
                if (first) setTimeout(function () { first.focus(); }, 0);
              }
            }
          }
        } else if (e.key === 'ArrowLeft') {
          var t = e.target;
          if (t && t.closest) {
            var sub = t.closest('.dropdown__submenu');
            if (sub) {
              e.preventDefault();
              var w = sub.closest('.dropdown__item-wrapper');
              if (w) {
                toggleSubmenu(w, false);
                var p = w.querySelector('.dropdown__item');
                if (p) p.focus();
              }
            }
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var t = e.target;
          if (t && t.getAttribute && t.getAttribute('aria-disabled') !== 'true') {
            var w = t.closest('.dropdown__item-wrapper');
            var sub = w ? w.querySelector('.dropdown__submenu') : null;
            if (sub) toggleSubmenu(w, undefined);
            else {
              if (t.tagName === 'A') t.click();
              else if (t.tagName === 'BUTTON') t.click();
              closeMenu();
            }
          }
        } else if (e.key === 'Tab') {
          closeMenu();
        }
      });
    });
  }

  // --- Accordion: init all [data-accordion] ---
  function initAccordions() {
    function initOne(accordion) {
      if (accordion.getAttribute('data-accordion-init') === 'true') return;
      accordion.setAttribute('data-accordion-init', 'true');
      var isMultiple = accordion.getAttribute('data-allow-multiple') === 'true';
      var triggers = accordion.querySelectorAll('[data-accordion-trigger]');
      function setExpanded(trigger, expanded) {
        var panelId = trigger.getAttribute('aria-controls');
        var panel = panelId ? accordion.querySelector('#' + CSS.escape(panelId)) : null;
        trigger.setAttribute('aria-expanded', String(expanded));
        trigger.classList.toggle('accordion__trigger--expanded', expanded);
        if (panel) {
          panel.classList.toggle('accordion__panel--expanded', expanded);
          panel.hidden = !expanded;
        }
      }
      function toggle(trigger) {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        if (!isMultiple) {
          for (var i = 0; i < triggers.length; i++) setExpanded(triggers[i], false);
        }
        setExpanded(trigger, !expanded);
      }
      for (var i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', function () { toggle(this); });
      }
      for (var i = 0; i < triggers.length; i++) {
        (function (idx) {
          triggers[idx].addEventListener('keydown', function (e) {
            var targetIndex = idx;
            switch (e.key) {
              case 'ArrowDown':
                e.preventDefault();
                targetIndex = Math.min(idx + 1, triggers.length - 1);
                break;
              case 'ArrowUp':
                e.preventDefault();
                targetIndex = Math.max(idx - 1, 0);
                break;
              case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
              case 'End':
                e.preventDefault();
                targetIndex = triggers.length - 1;
                break;
              case 'Enter':
              case ' ':
                e.preventDefault();
                toggle(triggers[idx]);
                return;
              default:
                return;
            }
            if (targetIndex !== idx) triggers[targetIndex].focus();
          });
        })(i);
      }
      var slotContent = accordion.querySelector('.accordion__slot-content');
      if (slotContent) {
        var slotChildren = Array.prototype.slice.call(slotContent.children);
        for (var i = 0; i < slotChildren.length; i++) {
          var placeholder = accordion.querySelector('[data-accordion-slot-index="' + i + '"]');
          if (placeholder) placeholder.appendChild(slotChildren[i]);
        }
        slotContent.remove();
      }
    }
    document.querySelectorAll('[data-accordion]').forEach(initOne);
  }

  // --- Search: [data-search] — trigger opens overlay, panel has header (input + close), focus trap, overlay/close/Escape close
  function initSearch() {
    var focusableSel = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    function getFocusable(container) {
      return Array.prototype.slice.call(container.querySelectorAll(focusableSel));
    }
    document.querySelectorAll('[data-search]').forEach(function (search) {
      if (search.getAttribute('data-search-inited') === 'true') return;
      search.setAttribute('data-search-inited', 'true');
      var trigger = search.querySelector('.search__trigger');
      var overlay = search.querySelector('[data-search-overlay]');
      var panel = search.querySelector('.search__panel');
      var input = search.querySelector('.search__input');
      var closeBtn = search.querySelector('[data-search-close]');
      var resultItems = search.querySelectorAll('.search__result-item');
      if (!trigger || !overlay || !panel || !input) return;
      var previousActive = null;
      var focusTrapHandler = null;
      function openSearch() {
        previousActive = document.activeElement;
        overlay.setAttribute('aria-hidden', 'false');
        panel.setAttribute('aria-hidden', 'false');
        panel.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
        for (var i = 0; i < resultItems.length; i++) resultItems[i].setAttribute('tabindex', '0');
        input.focus();
        focusTrapHandler = function (e) {
          if (panel.getAttribute('data-open') !== 'true') return;
          if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
          if (e.key === 'Tab') {
            var els = getFocusable(panel);
            if (els.length === 0) return;
            var first = els[0], last = els[els.length - 1], active = document.activeElement;
            if (e.shiftKey) {
              if (active === first || !panel.contains(active)) { e.preventDefault(); last.focus(); }
            } else {
              if (active === last || !panel.contains(active)) { e.preventDefault(); first.focus(); }
            }
          }
        };
        document.addEventListener('keydown', focusTrapHandler);
      }
      function closeSearch() {
        document.removeEventListener('keydown', focusTrapHandler);
        focusTrapHandler = null;
        panel.removeAttribute('data-open');
        panel.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('aria-hidden', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        for (var i = 0; i < resultItems.length; i++) resultItems[i].setAttribute('tabindex', '-1');
        if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
        previousActive = null;
      }
      trigger.addEventListener('click', function () {
        if (panel.getAttribute('data-open') === 'true') closeSearch(); else openSearch();
      });
      if (closeBtn) closeBtn.addEventListener('click', closeSearch);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeSearch();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
      });
      search.__searchOpen = openSearch;
      search.__searchClose = closeSearch;
    });
    if (!window.__rizzoSearchCmdK) {
      window.__rizzoSearchCmdK = true;
      document.addEventListener('keydown', function (e) {
        var isMod = e.ctrlKey || e.metaKey;
        var isK = e.key === 'k' || e.key === 'K';
        if (!isMod || !isK) return;
        var searchEl = document.querySelector('[data-search]');
        if (!searchEl || !searchEl.__searchOpen) return;
        var panelEl = searchEl.querySelector('.search__panel');
        if (!panelEl) return;
        var target = e.target;
        var inOtherInput = target && !searchEl.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable === true || (target.closest && target.closest('input, textarea, [contenteditable="true"]')));
        var isOpen = panelEl.getAttribute('data-open') === 'true';
        if (isOpen || !inOtherInput) {
          e.preventDefault();
          e.stopPropagation();
          if (isOpen) searchEl.__searchClose(); else searchEl.__searchOpen();
        }
      }, true);
    }
  }

  function initNavbarMobile() {
    document.querySelectorAll('.navbar').forEach(function (navbar) {
      var toggle = navbar.querySelector('.navbar__toggle');
      var menu = navbar.querySelector('.navbar__menu');
      if (!toggle || !menu) return;
      var outsideClickHandler = null;
      function setMenuOpen(open) {
        menu.classList.toggle('navbar__menu--open', open);
        navbar.classList.toggle('navbar--menu-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menu.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (outsideClickHandler) {
          document.removeEventListener('click', outsideClickHandler);
          outsideClickHandler = null;
        }
        if (open) {
          outsideClickHandler = function (e) {
            if (e.target && !navbar.contains(e.target)) setMenuOpen(false);
          };
          setTimeout(function () { document.addEventListener('click', outsideClickHandler); }, 0);
        }
      }
      toggle.addEventListener('click', function () {
        setMenuOpen(!menu.classList.contains('navbar__menu--open'));
      });
      menu.querySelectorAll('.navbar__link').forEach(function (link) {
        link.addEventListener('click', function () { setMenuOpen(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('navbar__menu--open')) setMenuOpen(false);
      });
    });
  }

  function run() {
    initTheme();
    initSettings();
    initCopyToClipboard();
    initTabs();
    initModals();
    initDropdowns();
    initAccordions();
    initSearch();
    initNavbarMobile();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
