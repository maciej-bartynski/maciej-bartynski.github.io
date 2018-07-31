(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', initializeGuide);

    function initializeGuide() {
      hideUserGuide();
      setTimeout(function () {
        var aside = document.querySelector('aside');
        aside.classList.add('onLoad');
      }, 0);
    }

    function hideUserGuide() {
      var ornm = document.querySelector('.aside-head');
      ornm.addEventListener('click', rotateAndHideAside);
      var btn = document.querySelector('.user-guide_hide');
      btn.addEventListener('click', rotateAndHideAside);
    }
    var controller = 0;

    function rotateAndHideAside() {
      var aside = document.querySelector('aside');
      if (controller === 0) {
        var headBelt = aside.querySelector('.aside-head');
        var piece = headBelt.offsetHeight;
        aside.style.transform = 'rotate(90deg)';
        var aw = aside.offsetWidth;
        var ah = aside.offsetHeight;
        var wsp = ah + (aw - ah) / 2;
        var x = wsp * -1 + piece;
        var y = x + 'px';
        var z = (aw - ah) / 2 + 'px';
        aside.style.left = y;
        aside.style.bottom = z;
        controller = 1;
      } else if (controller === 1) {
        aside.style.transform = 'rotate(0deg)';
        aside.style.left = 0;
        aside.style.bottom = 0;
        controller = 0;
      }
    }

    function guideReacts(i) {
      var aside = document.querySelector('aside');
      aside.classList.remove('onAdvice');
      aside.classList.remove('onAdviceB');
      setTimeout(function () {
        shakeToFocusUsersAttention(aside);
      }, 0);
      var guide = document.querySelector('.aside-foot .user-guide');
      var title = document.querySelector('.aside-foot_title');
      var arr = ['Gdy wpiszesz imię, przydomek i zawołanie, po zatwierdzeniu zmian pojawi się następna część formularza.', 'Po wyborze klasy, pojawi sie okno wyboru ataku spośród uderzeń charakterystycznych dla tej postaci.', 'Wybierz uderzenie, klikając w słowo opisujące je. Przy każdym epitecie widnieje charakterystyka ciosu w Ikonach Żywiołów i Ikonach Uderzeń.', 'Wymyśl nazwe dla uderzenia z poprzedniego kroku. Gdy ją zatwierdzisz, pojawi sie kolejna cześć karty postaci.', 'Po wyborze jednej opcji z każdej listy, pojawi sie kolejna cześć karty postaci.', 'Kliknij tyle opcji, ile chcesz. Każdy zestaw (czyli moc i pietno) zabiera ci pewną ilość punktów Mądrości.', 'Rozdaj pozostałe punkty mądrości na współczynniki postaci: Życie, Mądrość, Ruch i Działanie.', 'Rozdaj pozostałe punkty mądrości na współczynniki postaci: Życie, Mądrość, Ruch i Działanie.'];
      guide.innerText = arr[i];
      var arrB = ['tożsamość:', 'klasa:', 'atak:', 'nazwa ataku:', 'obrona:', 'zdolność i słabość:', 'atrybuty:', 'atrybuty:'];
      title.innerText = arrB[i];
    }
    function shakeToFocusUsersAttention(aside) {
      if (controller === 1) {
        var headBelt = aside.querySelector('.aside-head');
        var piece = headBelt.offsetHeight;
        aside.style.transform = 'rotate(90deg)';
        var aw = aside.offsetWidth;
        var ah = aside.offsetHeight;
        var wsp = ah + (aw - ah) / 2;
        var x = wsp * -1 + piece;
        var y = x + 'px';
        var z = (aw - ah) / 2 + 'px';
        aside.style.left = y;
        aside.style.bottom = z;
        aside.classList.add('onAdvice');
      } else if (controller === 0) {
        aside.classList.add('onAdviceB');
      }
    }

    var iteratorOfPointsLeft = {
      left: 20,
      spentOnAttack: 0,
      iterator: function iterator(cont, x) {
        var iterDevice = document.querySelector('.aside-body_how-much');
        var opt = cont.querySelectorAll('.corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt')[x];
        var points = opt.querySelectorAll('img');
        var amount = points.length - 1;
        var bilans = amount - this.spentOnAttack;
        this.left = this.left - bilans;
        this.spentOnAttack = amount;
        iterDevice.innerText = 'Pozostało' + ' ' + this.left + 'x';
        this.animateOptsSpending(opt, amount);
      },
      deletator: function deletator() {
        var iterDevice = document.querySelector('.aside-body_how-much');
        this.left = this.left + this.spentOnAttack;
        this.spentOnAttack = 0;
        iterDevice.innerText = 'Pozostało' + ' ' + this.left + 'x';
      },
      animateOptsSpending: function animateOptsSpending(opt, amount) {
        var coin = document.createElement('IMG');
        coin.setAttribute('src', './icons/ikona-poteg.svg');
        coin.classList.add('itIsCoin');
        var axS = window.scrollY;
        var axX = opt.offsetTop;
        var axZ = axX - axS;
        var axY = opt.offsetLeft;
        coin.style.top = axZ + 'px';
        coin.style.left = axY + 'px';
        document.querySelector('body').appendChild(coin);
        setTimeout(function () {
          coin.style.left = '0';
          coin.style.top = '90%';
          coin.style.width = '55px';
          coin.style.height = '55px';
        }, 0);
        setTimeout(function () {
          document.querySelector('body').removeChild(coin);
          document.querySelector('aside').classList.add('onAdvice');
        }, 550);
      },
      iteratorB: function iteratorB(integer) {
        var iterDevice = document.querySelector('.aside-body_how-much');
        this.left = this.left + integer;
        iterDevice.innerText = 'Pozostało' + ' ' + this.left + 'x';
      },
      deletatorB: function deletatorB(integer) {
        var iterDevice = document.querySelector('.aside-body_how-much');
        this.left = this.left - integer;
        iterDevice.innerText = 'Pozostało' + ' ' + this.left + 'x';
      },
      equalizator: function equalizator() {
        var iterDevice = document.querySelector('.aside-body_how-much');
        iterDevice.innerText = 'Pozostało' + ' ' + this.left + 'x';
      }
    };

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        var btns = document.querySelectorAll('.corpus_section_form_fields-2_fieldset-d_container_atryb .--belt_icon-container');
        var belts = document.querySelectorAll('.corpus_section_form_fields-2_fieldset-d_container_atryb .--belt_body-container_body');
        var iter = btns.length;
        for (var i = 0; i < iter; i++) {
            if (i > -1) {
                (function () {
                    var attryb = btns[i];
                    var belt = belts[i];
                    attryb.addEventListener('click', function () {
                        if (iteratorOfPointsLeft.left > 0) {
                            addPoint(belt);
                        }
                    });
                })();
            }
        }
    }

    function addPoint(belt) {
        var IMG = document.createElement('IMG');
        IMG.setAttribute('src', 'icons/ikona-poteg.svg');
        belt.appendChild(IMG);
        iteratorOfPointsLeft.left--;
        iteratorOfPointsLeft.equalizator();
        IMG.addEventListener('click', function () {
            deleteThisIMG(IMG);
        });
    }

    function deleteThisIMG(x) {
        x.remove();
        iteratorOfPointsLeft.left++;
        iteratorOfPointsLeft.equalizator();
    }

    var controller$1 = 0;

    function initUserFlowToNextSection_showLastBtnOfAcceptance() {
        if (controller$1 === 0) {
            var btnContainerForThisSection = document.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner.seventhSectionBtn");
            var btnOfThisSection = btnContainerForThisSection.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner_btn");
            showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
            controller$1 = 1;
            clickBtnOfAcceptance(btnOfThisSection);
        }
    }
    function clickBtnOfAcceptance(btn) {
        var clickBtn = document.createEvent('MouseEvent');
        clickBtn.initMouseEvent('click');
        btn.dispatchEvent(clickBtn);
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var zenscroll = createCommonjsModule(function (module) {
    /**
     * Zenscroll 4.0.2
     * https://github.com/zengabor/zenscroll/
     *
     * Copyright 2015–2018 Gabor Lenard
     *
     * This is free and unencumbered software released into the public domain.
     * 
     * Anyone is free to copy, modify, publish, use, compile, sell, or
     * distribute this software, either in source code form or as a compiled
     * binary, for any purpose, commercial or non-commercial, and by any
     * means.
     * 
     * In jurisdictions that recognize copyright laws, the author or authors
     * of this software dedicate any and all copyright interest in the
     * software to the public domain. We make this dedication for the benefit
     * of the public at large and to the detriment of our heirs and
     * successors. We intend this dedication to be an overt act of
     * relinquishment in perpetuity of all present and future rights to this
     * software under copyright law.
     * 
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
     * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
     * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
     * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     * 
     * For more information, please refer to <http://unlicense.org>
     * 
     */

    /*jshint devel:true, asi:true */

    /*global define, module */


    (function (root, factory) {
    	if (module.exports) {
    		module.exports = factory();
    	} else {
    		(function install() {
    			// To make sure Zenscroll can be referenced from the header, before `body` is available
    			if (document && document.body) {
    				root.zenscroll = factory();
    			} else {
    				// retry 9ms later
    				setTimeout(install, 9);
    			}
    		})();
    	}
    }(commonjsGlobal, function () {


    	// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
    	var isNativeSmoothScrollEnabledOn = function (elem) {
    		return elem && "getComputedStyle" in window &&
    			window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
    	};


    	// Exit if it’s not a browser environment:
    	if (typeof window === "undefined" || !("document" in window)) {
    		return {}
    	}


    	var makeScroller = function (container, defaultDuration, edgeOffset) {

    		// Use defaults if not provided
    		defaultDuration = defaultDuration || 999; //ms
    		if (!edgeOffset && edgeOffset !== 0) {
    			// When scrolling, this amount of distance is kept from the edges of the container:
    			edgeOffset = 9; //px
    		}

    		// Handling the life-cycle of the scroller
    		var scrollTimeoutId;
    		var setScrollTimeoutId = function (newValue) {
    			scrollTimeoutId = newValue;
    		};

    		/**
    		 * Stop the current smooth scroll operation immediately
    		 */
    		var stopScroll = function () {
    			clearTimeout(scrollTimeoutId);
    			setScrollTimeoutId(0);
    		};

    		var getTopWithEdgeOffset = function (elem) {
    			return Math.max(0, container.getTopOf(elem) - edgeOffset)
    		};

    		/**
    		 * Scrolls to a specific vertical position in the document.
    		 *
    		 * @param {targetY} The vertical position within the document.
    		 * @param {duration} Optionally the duration of the scroll operation.
    		 *        If not provided the default duration is used.
    		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
    		 */
    		var scrollToY = function (targetY, duration, onDone) {
    			stopScroll();
    			if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
    				container.toY(targetY);
    				if (onDone) {
    					onDone();
    				}
    			} else {
    				var startY = container.getY();
    				var distance = Math.max(0, targetY) - startY;
    				var startTime = new Date().getTime();
    				duration = duration || Math.min(Math.abs(distance), defaultDuration);
    				(function loopScroll() {
    					setScrollTimeoutId(setTimeout(function () {
    						// Calculate percentage:
    						var p = Math.min(1, (new Date().getTime() - startTime) / duration);
    						// Calculate the absolute vertical position:
    						var y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)));
    						container.toY(y);
    						if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
    							loopScroll();
    						} else {
    							setTimeout(stopScroll, 99); // with cooldown time
    							if (onDone) {
    								onDone();
    							}
    						}
    					}, 9));
    				})();
    			}
    		};

    		/**
    		 * Scrolls to the top of a specific element.
    		 *
    		 * @param {elem} The element to scroll to.
    		 * @param {duration} Optionally the duration of the scroll operation.
    		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
    		 */
    		var scrollToElem = function (elem, duration, onDone) {
    			scrollToY(getTopWithEdgeOffset(elem), duration, onDone);
    		};

    		/**
    		 * Scrolls an element into view if necessary.
    		 *
    		 * @param {elem} The element.
    		 * @param {duration} Optionally the duration of the scroll operation.
    		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
    		 */
    		var scrollIntoView = function (elem, duration, onDone) {
    			var elemHeight = elem.getBoundingClientRect().height;
    			var elemBottom = container.getTopOf(elem) + elemHeight;
    			var containerHeight = container.getHeight();
    			var y = container.getY();
    			var containerBottom = y + containerHeight;
    			if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
    				// Element is clipped at top or is higher than screen.
    				scrollToElem(elem, duration, onDone);
    			} else if ((elemBottom + edgeOffset) > containerBottom) {
    				// Element is clipped at the bottom.
    				scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone);
    			} else if (onDone) {
    				onDone();
    			}
    		};

    		/**
    		 * Scrolls to the center of an element.
    		 *
    		 * @param {elem} The element.
    		 * @param {duration} Optionally the duration of the scroll operation.
    		 * @param {offset} Optionally the offset of the top of the element from the center of the screen.
    		 *        A value of 0 is ignored.
    		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
    		 */
    		var scrollToCenterOf = function (elem, duration, offset, onDone) {
    			scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight()/2 + (offset || elem.getBoundingClientRect().height/2)), duration, onDone);
    		};

    		/**
    		 * Changes default settings for this scroller.
    		 *
    		 * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
    		 *        Ignored if null or undefined.
    		 * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
    		 * @returns An object with the current values.
    		 */
    		var setup = function (newDefaultDuration, newEdgeOffset) {
    			if (newDefaultDuration === 0 || newDefaultDuration) {
    				defaultDuration = newDefaultDuration;
    			}
    			if (newEdgeOffset === 0 || newEdgeOffset) {
    				edgeOffset = newEdgeOffset;
    			}
    			return {
    				defaultDuration: defaultDuration,
    				edgeOffset: edgeOffset
    			}
    		};

    		return {
    			setup: setup,
    			to: scrollToElem,
    			toY: scrollToY,
    			intoView: scrollIntoView,
    			center: scrollToCenterOf,
    			stop: stopScroll,
    			moving: function () { return !!scrollTimeoutId },
    			getY: container.getY,
    			getTopOf: container.getTopOf
    		}

    	};


    	var docElem = document.documentElement;
    	var getDocY = function () { return window.scrollY || docElem.scrollTop };

    	// Create a scroller for the document:
    	var zenscroll = makeScroller({
    		body: document.scrollingElement || document.body,
    		toY: function (y) { window.scrollTo(0, y); },
    		getY: getDocY,
    		getHeight: function () { return window.innerHeight || docElem.clientHeight },
    		getTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop }
    	});


    	/**
    	 * Creates a scroller from the provided container element (e.g., a DIV)
    	 *
    	 * @param {scrollContainer} The vertical position within the document.
    	 * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
    	 *        Ignored if 0 or null or undefined.
    	 * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
    	 *        Ignored if null or undefined.
    	 * @returns A scroller object, similar to `zenscroll` but controlling the provided element.
    	 */
    	zenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
    		return makeScroller({
    			body: scrollContainer,
    			toY: function (y) { scrollContainer.scrollTop = y; },
    			getY: function () { return scrollContainer.scrollTop },
    			getHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight) },
    			getTopOf: function (elem) { return elem.offsetTop }
    		}, defaultDuration, edgeOffset)
    	};


    	// Automatic link-smoothing on achors
    	// Exclude IE8- or when native is enabled or Zenscroll auto- is disabled
    	if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {

    		var isHistorySupported = "history" in window && "pushState" in history;
    		var isScrollRestorationSupported = isHistorySupported && "scrollRestoration" in history;

    		// On first load & refresh make sure the browser restores the position first
    		if (isScrollRestorationSupported) {
    			history.scrollRestoration = "auto";
    		}

    		window.addEventListener("load", function () {

    			if (isScrollRestorationSupported) {
    				// Set it to manual
    				setTimeout(function () { history.scrollRestoration = "manual"; }, 9);
    				window.addEventListener("popstate", function (event) {
    					if (event.state && "zenscrollY" in event.state) {
    						zenscroll.toY(event.state.zenscrollY);
    					}
    				}, false);
    			}

    			// Add edge offset on first load if necessary
    			// This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
    			if (window.location.hash) {
    				setTimeout(function () {
    					// Adjustment is only needed if there is an edge offset:
    					var edgeOffset = zenscroll.setup().edgeOffset;
    					if (edgeOffset) {
    						var targetElem = document.getElementById(window.location.href.split("#")[1]);
    						if (targetElem) {
    							var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset);
    							var diff = zenscroll.getY() - targetY;
    							// Only do the adjustment if the browser is very close to the element:
    							if (0 <= diff && diff < 9 ) {
    								window.scrollTo(0, targetY);
    							}
    						}
    					}
    				}, 9);
    			}

    		}, false);

    		// Handling clicks on anchors
    		var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)");
    		window.addEventListener("click", function (event) {
    			var anchor = event.target;
    			while (anchor && anchor.tagName !== "A") {
    				anchor = anchor.parentNode;
    			}
    			// Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
    			if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
    				return
    			}
    			// Save the current scrolling position so it can be used for scroll restoration:
    			if (isScrollRestorationSupported) {
    				var historyState = history.state && typeof history.state === "object" ? history.state : {};
    				historyState.zenscrollY = zenscroll.getY();
    				try {
    					history.replaceState(historyState, "");
    				} catch (e) {
    					// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
    				}
    			}
    			// Find the referenced ID:
    			var href = anchor.getAttribute("href") || "";
    			if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
    				var targetY = 0;
    				var targetElem = document.getElementById(href.substring(1));
    				if (href !== "#") {
    					if (!targetElem) {
    						// Let the browser handle the click if the target ID is not found.
    						return
    					}
    					targetY = zenscroll.getTopOf(targetElem);
    				}
    				event.preventDefault();
    				// By default trigger the browser's `hashchange` event...
    				var onDone = function () { window.location = href; };
    				// ...unless there is an edge offset specified
    				var edgeOffset = zenscroll.setup().edgeOffset;
    				if (edgeOffset) {
    					targetY = Math.max(0, targetY - edgeOffset);
    					if (isHistorySupported) {
    						onDone = function () { history.pushState({}, "", href); };
    					}
    				}
    				zenscroll.toY(targetY, null, onDone);
    			}
    		}, false);

    	}


    	return zenscroll


    }));
    });

    document.addEventListener('DOMContentLoaded', initializeBtnsOfAcceptance);

    function initializeBtnsOfAcceptance() {
      var acceptationBtn = document.querySelectorAll('.corpus_section_form_field-A_btn-belt_btn-positioner_btn');
      var amount = acceptationBtn.length;

      var _loop = function _loop(i) {
        acceptationBtn[i].addEventListener('click', function () {
          if (acceptationBtn[i].classList.contains('beforeItIsClicked') === true) {
            acceptationBtn[i].classList.remove('beforeItIsClicked');
            acceptationBtn[i].classList.add('itIsClicked');
            signThisAsClicked(acceptationBtn[i]);
            initializeNextSection(i);
          } else {
            initAgainGuideTextForThisSection(i);
          }
        });
      };

      for (var i = 0; i < amount; i++) {
        _loop(i);
      }
    }

    function signThisAsClicked(btn) {
      btn.innerText = '';
    }

    function initAgainGuideTextForThisSection(i) {
      guideReacts(i);
    }

    function initializeNextSection(iterator) {
      var allOrnaments = document.querySelectorAll('img.corpus_section_form_ornament-marker');
      var thisOrnament = allOrnaments[iterator];
      var nextOrnament = allOrnaments[iterator + 1];
      if (iterator === 1 || iterator === 2) {
        thisOrnament = allOrnaments[0];
        nextOrnament = allOrnaments[1];
      } else if (iterator >= 3 && iterator !== 5) {
        thisOrnament = allOrnaments[iterator - 2];
        nextOrnament = allOrnaments[iterator - 1];
      } else if (iterator >= 4) {
        thisOrnament = allOrnaments[iterator - 3];
        nextOrnament = allOrnaments[iterator - 2];
      }
      if (iterator !== 6) {
        thisOrnament.setAttribute('src', './icons/pole.2.svg');
        thisOrnament.classList.add('itIsPassedThrought');
        nextOrnament.classList.remove('itIsHidden');
        // window.scrollTo(0, nextOrnament.offsetTop)
        zenscroll.toY(thisOrnament.offsetTop);
      }
      enableNextSection(iterator);
      if (iterator === 1) {
        var PositionA = document.querySelectorAll('.corpus_section_form_fields fieldset')[1];
        zenscroll.toY(PositionA.offsetTop);
      } else if (iterator === 2) {
        var PositionB = document.querySelectorAll('.corpus_section_form_fields fieldset')[2];
        zenscroll.toY(PositionB.offsetTop);
      } else if (iterator === 5) {
        var PositionC = document.querySelectorAll('.corpus_section_form_fields-2 fieldset')[1];
        zenscroll.toY(PositionC.offsetTop);
        initUserFlowToNextSection_showLastBtnOfAcceptance();
      }
    }

    function enableNextSection(iterator) {
      iterator += 1;
      guideReacts(iterator);

      var allSections = [undefined, document.querySelector('.corpus_section_form_fields'), document.querySelectorAll('.corpus_section_form_fields fieldset')[1], document.querySelectorAll('.corpus_section_form_fields fieldset')[2], document.querySelector('.corpus_section_form_field-C'), document.querySelector('.corpus_section_form_fields-2'), document.querySelectorAll('.corpus_section_form_fields-2 fieldset')[1], document.querySelectorAll('.corpus_section_form_fields-2 fieldset')[1]];
      allSections[iterator].classList.remove('itIsHidden');
      if (iterator === 3) {
        allSections[iterator].querySelector('.corpus_section_form_fields_fieldset-b_container').classList.remove('strikeName');
      }
    }
    function showBtnOfAcceptance(btn, container) {
      container.classList.remove('itIsHidden');
      btn.classList.add('beforeItIsClicked');
    }

    document.addEventListener('DOMContentLoaded', initializeUserFlowViaSectionOfDescriptions);

    function initializeUserFlowViaSectionOfDescriptions() {
        var strikeName = document.querySelector('input[name="nazwauderzenia"]');
        strikeName.addEventListener('change', function () {
            showDescription();
            initUserFlowToNextSection_showBtnOfAcceptance();
            if (strikeName.value.trim() !== '') {
                useThisValueToCreateDescription(strikeName.value + ' to', 0);
            } else {
                useThisValueToCreateDescription('Gdy już wpiszesz nazwę tego uderzenia, to zasłynie ono jako', 0);
            }
        });
    }
    function useThisValueToCreateDescription(string, integer) {
        var spans = document.querySelectorAll('p.--des span');
        spans[integer].innerText = string;
    }
    var onlyOnce = 0;

    function showDescription() {
        onlyOnce++;
        if (onlyOnce === 1) {
            var item = document.querySelector('p.--des');
            item.classList.remove('itsHidden');
        }
    }
    var controller$2 = 0;

    function initUserFlowToNextSection_showBtnOfAcceptance() {
        if (controller$2 === 0) {
            var btnContainerForThisSection = document.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner.fourthSectionBtn");
            var btnOfThisSection = btnContainerForThisSection.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner_btn");
            showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
            controller$2 = 1;
        }
    }
    /*
    function setStrikeNameOntoDescription(i) {
        let inp = document.querySelector('input[name="nazwauderzenia"]')
        inp.addEventListener('keyup', function () {
            let strName = inp.value;
            let item = document.querySelector('.--des_nazwa-ciosu');
            item.innerText = strName + ' to legendarne';
            showAllDes();
        })
        inp.addEventListener('change', function () {
            let itm = inp.value
            if (itm.trim() !== '' && setNextPartOfFormulaForTheFirstTime === 0) {
                let strName = inp.value
                let item = document.querySelector('.--des_nazwa-ciosu')
                item.innerText = strName + ' to legendarne'
                showAllDes();
                setNextPartOfFormula();
                setNextPartOfFormulaForTheFirstTime = 1;
            }
        })
    }*/

    document.addEventListener('DOMContentLoaded', function () {
      initUserFlowViaSection_selectNodesToThisProcess();
    });

    function initUserFlowViaSection_selectNodesToThisProcess() {
      var nodes = [document.querySelector('input[name="imie"]'), document.querySelector('input[name="przydomek"]'), document.querySelector('input[name="zawolanie"]')];
      nodes.forEach(function (node, idx) {
        return node.addEventListener('keyup', function (event) {
          var sectionCompleted = initUserFlowToNextSection_checkIfThisSectionIsCompleted(nodes);
          if (event.keyCode === 13 && sectionCompleted !== true) {
            initUserFlowViaSection_goToNextNode(node, idx, nodes);
          } else if (event.keyCode === 13 && sectionCompleted === true) {
            node.blur();
            initUserFlowToNextSection_showBtnOfAcceptance$1();
          }
        });
      });
      nodes.forEach(function (node, idx) {
        return node.addEventListener('change', function (event) {
          var sectionCompleted = initUserFlowToNextSection_checkIfThisSectionIsCompleted(nodes);
          if (sectionCompleted === true) {
            initUserFlowToNextSection_showBtnOfAcceptance$1();
          }      if (idx === 0 || idx === 1) {
            if (idx === 0) {
              var string = node.value.charAt(0).toUpperCase() + node.value.slice(1);
              useThisValueToCreateDescription(string, 3);
            } else {
              var _string = node.value.charAt(0).toUpperCase() + node.value.slice(1);
              useThisValueToCreateDescription(_string, 4);
            }
          }
        });
      });
    }

    function initUserFlowViaSection_goToNextNode(node, idx, nodes) {
      node.blur();
      if (idx < 2) {
        nodes[idx + 1].focus();
      } else if (idx === 2) {
        nodes[0].focus();
      }
    }

    function initUserFlowToNextSection_checkIfThisSectionIsCompleted(nodes) {
      var arr = [false, false, false];
      nodes.forEach(function (node, idx) {
        if (node.value.trim() === '') {
          arr[idx] = false;
        } else {
          arr[idx] = true;
        }
      });
      if (arr.indexOf(false) === -1) {
        return true;
      } else {
        return false;
      }
    }
    var controller$3 = 0;

    function initUserFlowToNextSection_showBtnOfAcceptance$1() {
      if (controller$3 === 0) {
        var btnContainerForThisSection = document.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner.firstSectionBtn');
        var btnOfThisSection = btnContainerForThisSection.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner_btn');
        showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
        //setCurrentDataToAvatarDescription();
        controller$3 = 1;
      }
    }

    function objectToArray(object) {
        var amount = object.length;
        var array = [];
        for (var i = 0; i < amount; i++) {
            array.push(object[i]);
        }
        return array;
    }

    document.addEventListener("DOMContentLoaded", initializeAttacksPart);
    function enableAttacks(i) {
      var attacks = objectToArray(document.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container"));
      attacks.forEach(function (attack, idx) {
        attack.classList.remove("enabled");
        var options = objectToArray(attack.querySelectorAll("option"));
        attack.querySelector("select").addEventListener("change", function () {
          synchronizeBackgroundsOnChange(attack, options);
          sendListValueToFunctionThatSendsItFurther(attack.querySelector("select").value, 1);
          sendIMGlistToFunctionThatSendsItFurther(attack, options);
          sendPowersToFunctionThatSensItFurther(attack, options);
        });
        attack.querySelector("select").addEventListener("blur", function () {
          synchronizeBackgroundsOnBlur(attack, attack.querySelector("select"), options);
        });
        options.forEach(function (option) {
          if (option.selected === true) {
            option.selected = false;
          }
        });
        objectToArray(attack.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt")).forEach(function (belt) {
          belt.classList.remove("JSonBlur", "JSonSelect");
        });
      });
      attacks[i].classList.add("enabled");
    }

    function synchronizeBackgroundsOnChange(node, children) {
      var belts = objectToArray(node.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt"));
      belts.forEach(function (belt) {
        return belt.classList.remove("JSonSelect", "JSonBlur");
      });
      children.forEach(function (opt, idx) {
        if (opt.value === node.querySelector("select").value) {
          belts[idx].classList.add("JSonSelect");
          initUserFlowToNextSection_showBtnOfAcceptance$2();
          iteratorOfPointsLeft.iterator(node, idx);
        }
      });
    }

    function synchronizeBackgroundsOnBlur(node, list, options) {
      options.forEach(function (option, idx) {
        if (option.value === list.value) {
          node.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt")[idx].classList.add("JSonBlur");
        }
      });
    }

    var controller$4 = 0;

    function initUserFlowToNextSection_showBtnOfAcceptance$2() {
      if (controller$4 === 0) {
        var btnContainerForThisSection = document.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner.thirdSectionBtn");
        var btnOfThisSection = btnContainerForThisSection.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner_btn");
        showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
        controller$4 = 1;
      }
    }

    function initializeAttacksPart() {
      objectToArray(document.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container")).forEach(function (container) {
        //on select-list option mouse hover over
        objectToArray(container.querySelectorAll("option")).forEach(function (option, idx) {
          option.addEventListener("mouseout", function (event) {
            highlightBackground(container, event, idx);
          });
          option.addEventListener("mouseover", function (event) {
            highlightBackground(container, event, idx);
          });
        });
        //option-like div
        objectToArray(container.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt")).forEach(function (belt, idx) {
          belt.addEventListener("mouseover", function (event) {
            highlightBackground(container, event, idx);
          });
          belt.addEventListener("mouseout", function (event) {
            highlightBackground(container, event, idx);
          });
          belt.addEventListener("click", function (event) {
            var changeEv = document.createEvent('Event');
            changeEv.initEvent('change');
            container.querySelectorAll("option")[idx].selected = true;
            container.querySelector("select").dispatchEvent(changeEv);
          });
        });
      });
    }

    function highlightBackground(container, event, idx) {
      if (event.type === "mouseover") {
        container.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt")[idx].classList.add("JSonHover");
        container.querySelectorAll("option")[idx].classList.add("JSonHover");
      } else if (event.type === "mouseout") {
        container.querySelectorAll(".corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt")[idx].classList.remove("JSonHover");
        container.querySelectorAll("option")[idx].classList.remove("JSonHover");
      }
    }

    function sendListValueToFunctionThatSendsItFurther(string, iter) {
      string = string.toLowerCase();
      useThisValueToCreateDescription(string, iter);
    }

    function sendIMGlistToFunctionThatSendsItFurther(attack, options) {
      options.forEach(function (opt, idx) {
        if (opt.value === attack.querySelector('select').value) {
          sendIMG(attack.querySelectorAll('.corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt')[idx]);
        }
      });
    }

    function sendIMG(beltOfImages) {
      var imag = beltOfImages.querySelectorAll('img')[0];
      var attryb = imag.getAttribute('src');
      var icon = document.querySelector('.--plate_img_icon');
      icon.setAttribute('src', attryb);
      var allIMGs = beltOfImages.querySelectorAll('img').length;
      var standart = document.querySelector('.--standart_img_bckg');
      while (standart.querySelector('IMG') !== null) {
        var imageToDel = standart.querySelector('IMG');
        standart.removeChild(imageToDel);
      }
      for (var j = 0; j < allIMGs; j++) {
        if (j > 0) {
          var theIMG = beltOfImages.querySelectorAll('img')[j];
          var sourceIMG = theIMG.getAttribute('src');
          var newIMG = document.createElement('img');
          newIMG.setAttribute('src', sourceIMG);
          standart.appendChild(newIMG);
        }
      }
    }

    function sendPowersToFunctionThatSensItFurther(node, opts) {
      var iterator = void 0;
      opts.forEach(function (opt, idx) {
        if (opt.value === node.querySelector('select').value) {
          iterator = idx;
        }
      });
      var belt = node.querySelectorAll('.corpus_section_form_fields_fieldset-b_container_select-container_img-part-container_opt')[iterator];
      var strng = [];
      var IMGs = objectToArray(belt.querySelectorAll('img'));
      IMGs.forEach(function (IMG, idx) {
        if (idx !== 0) {
          var attryb = IMG.getAttribute('src');
          if (attryb === 'icons/bron-barba.svg') {
            strng.push('dodatkową mocą uderzeniową');
          } else if (attryb === 'icons/bron-czar.svg') {
            strng.push('dodatkową mocą czarnoksięską');
          } else if (attryb === 'icons/bron-strz.svg') {
            strng.push('dodatkowym kunsztem strzeleckim');
          } else if (attryb === 'icons/bron-szal.svg') {
            strng.push('dodatkowym szaleństwem');
          } else if (attryb === 'icons/bron-zdra.svg') {
            strng.push('niespodzianym zdradliwym ciosem');
          } else if (attryb === 'icons/zyw-ogien.svg') {
            strng.push('żywiołem ognia');
          } else if (attryb === 'icons/zyw-rozklad.svg') {
            strng.push('żywiołem rozkładu');
          } else if (attryb === 'icons/zyw-wod.svg') {
            strng.push('żywiołem wody');
          } else if (attryb === 'icons/zyw-zmiana.svg') {
            strng.push('żywiołem zmiany');
          } else if (attryb === 'icons/zyw-zywia.svg') {
            strng.push('żywiołem żywii');
          } else {
            strng.push('własną mądrością żywiołów i talentów');
          }
        }
      });
      strng = strng.join(', ');
      useThisValueToCreateDescription(strng + '.', 6);
    }

    document.addEventListener('DOMContentLoaded', function () {
        initUserFlowViaSection_selectNodesToThisProcess$1();
    });

    function initUserFlowViaSection_selectNodesToThisProcess$1() {
        var avatarObjects = document.querySelectorAll('.corpus_section_form_fields_fieldset-b_container_radio-lab-container');
        var avatars = objectToArray(avatarObjects);
        avatars.forEach(function (item, idx) {
            return item.addEventListener('click', function () {
                avatarIsClicked(item, avatars, idx);
                sendAvatarsValueToFunctionThatSendItFurther(item.value, idx);
            });
        });
    }

    function avatarIsClicked(avatar, avatars, idx) {
        avatars.forEach(function (item) {
            return item.classList.remove('isClicked');
        });
        var av = avatar.querySelector('input');
        av.checked = true;
        avatar.classList.add('isClicked');
        initUserFlowToNextSection_showBtnOfAcceptance$3(idx);
    }
    var controller$5 = 0;

    function initUserFlowToNextSection_showBtnOfAcceptance$3(idx) {
        enableAttacks(idx);
        if (controller$5 === 0) {
            var btnContainerForThisSection = document.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner.secondSectionBtn');
            var btnOfThisSection = btnContainerForThisSection.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner_btn');
            showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
            controller$5 = 1;
        }
    }

    function sendAvatarsValueToFunctionThatSendItFurther(item, idx) {
        var string = void 0;
        if (idx === 0) {
            string = 'uderzenie ciężką bronią białą - czyli orężem brutalnym.';
        } else if (idx === 1) {
            string = 'uderzenie na dystans - czyli orężem strzeleckim.';
        } else if (idx === 2) {
            string = 'uderzenie lekką bronią białą - czyli orężem zdradzieckim.';
        } else if (idx === 3) {
            string = 'uderzenie wybuchową bronią alchemiczną - czyli orężem szaleńczym.';
        } else if (idx === 4) {
            string = 'uderzenie magiczną mocą - czyli orężem czarownika.';
        } else if (idx === 5) {
            string = 'uderzenie czymkolwiek, co wpadnie karłowi w plugawe łapska - czyli błazeńskim orężem ponurego dowcipnisia.';
        }
        useThisValueToCreateDescription(string, 2);
        useThisValueToCreateDescription("", 1);
    }

    /*function initUserFlowViaSection_selectNodesToThisProcess () {
      let nodes = [
        document.querySelectorAll('input[name="klasa"]'),
        document.querySelectorAll('select[name="uderzenie"]'),
        document.querySelectorAll('input[name="nazwauderzenia"]')
      ]
      initUserFlowViaSection_goToNextNode(nodes);
      //nodes[2].addEventListener('change', function () {
        //let btnContainerForThisSection = document.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner.secondSectionBtn')
        //let btnOfThisSection = btnContainerForThisSection.querySelector('.corpus_section_form_field-A_btn-belt_btn-positioner_btn')
       // showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection)
      //})
    }
    function initUserFlowViaSection_goToNextNode(nodes){
        let amount = nodes.length;
        for (let i=0; i<amount; i++){
            let nodeSet = nodes[i];
            let optIterator = nodeSet.length;
            for (let j=0; j<optIterator; j++){
                let option = nodeSet[j];
                option.addEventListener('change', function(){
                    goToNextNode(nodes, i);
                });
            }
        }
    }
    */

    document.addEventListener('DOMContentLoaded', initializeUserFlowViaSectionOfDefends);
    function initializeUserFlowViaSectionOfDefends() {
        initializeThisSection();
    }
    function initializeThisSection() {
        var listA = document.querySelector(".corpus_section_form_fieldset-c #zaslona");
        var listB = document.querySelector(".corpus_section_form_fieldset-c #pancerz");
        var imagesA = document.querySelectorAll(".corpus_section_form_fieldset-c_imgs_img.a");
        var imagesB = document.querySelectorAll(".corpus_section_form_fieldset-c_imgs_img.b");
        var optsA = listA.querySelectorAll("option");
        var optsB = listB.querySelectorAll("option");
        dynamizeThisList(listA, optsA, imagesA, listB);
        dynamizeThisList(listB, optsB, imagesB, listA);
    }

    function dynamizeThisList(list, opts, images, otherList) {
        list.addEventListener("change", function () {
            var value = list.value;
            var iter = opts.length;
            for (var j = 0; j < iter - 1; j++) {
                images[j].classList.add("itIsUnselected");
            }
            for (var i = 0; i < iter; i++) {
                var opt = opts[i];
                var optValue = opt.value;
                if (value === optValue && i !== 3) {
                    images[i].classList.remove("itIsUnselected");
                }
            }
            enableNextFormPart(list, otherList);
        });
    }
    function enableNextFormPart(list, otherList) {
        var a = list.value;
        var b = otherList.value;
        if (a !== "" && b !== "") {
            /*let nextPart = document.querySelector('.corpus_section_form_fields-2');
            nextPart.classList.remove('itIsHidden');
            let allOrnaments = document.querySelectorAll('img.corpus_section_form_ornament-marker');
            let thisOrnament = allOrnaments[2];
            thisOrnament.setAttribute('src', './icons/pole.2.svg');
            thisOrnament.classList.add('itIsPassedThrought');
            let nextOrnament = allOrnaments[3];
            nextOrnament.classList.remove('itIsHidden');*/
            initUserFlowToNextSection_showBtnOfAcceptance$4();
            //guideReacts(5);
        }
    }
    var controller$6 = 0;
    function initUserFlowToNextSection_showBtnOfAcceptance$4() {
        if (controller$6 === 0) {
            var btnContainerForThisSection = document.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner.fifthSectionBtn");
            var btnOfThisSection = btnContainerForThisSection.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner_btn");
            showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
            controller$6 = 1;
        }
    }

    document.addEventListener('DOMContentLoaded', initializeThisSelect);

    function initializeThisSelect() {
        var options = document.querySelectorAll('.corpus_section_form_fields-2_fieldset-d_container_moce');
        var iter = options.length;

        var _loop = function _loop(i) {
            var opt = options[i];
            opt.addEventListener('click', function () {
                itIsClicked(opt, options, iter, i);
                initUserFlowToNextSection_showBtnOfAcceptance$5();
            });
        };

        for (var i = 0; i < iter; i++) {
            _loop(i);
        }
    }
    function itIsClicked(opt, opts, iter, i) {
        var checks = document.querySelectorAll('input[name="moc-pietno"]');
        var costOfThis = [1, 2, 2, 1, 3, 1];
        if (checks[i].checked === true) {
            checks[i].checked = false;
            iteratorOfPointsLeft.iteratorB(costOfThis[i]);
        } else {
            checks[i].checked = true;
            iteratorOfPointsLeft.deletatorB(costOfThis[i]);
            //guideReacts(6);
        }
        for (var j = 0; j < iter; j++) {
            if (checks[j].checked === true) {
                opts[j].classList.remove('itIsHidden');
            }
            if (checks[j].checked === false) {
                opts[j].classList.add('itIsHidden');
            }
        }
    }
    var controller$7 = 0;

    function initUserFlowToNextSection_showBtnOfAcceptance$5() {
        if (controller$7 === 0) {
            var btnContainerForThisSection = document.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner.sixthSectionBtn");
            var btnOfThisSection = btnContainerForThisSection.querySelector(".corpus_section_form_field-A_btn-belt_btn-positioner_btn");
            showBtnOfAcceptance(btnOfThisSection, btnContainerForThisSection);
            controller$7 = 1;
        }
    }

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlcyI6WyIuLi9zb3VyY2UvZHluYW1pY3MvYXNpZGUuanMiLCIuLi9zb3VyY2UvZHluYW1pY3MvYXR0cnlicy5qcyIsIi4uL25vZGVfbW9kdWxlcy96ZW5zY3JvbGwvemVuc2Nyb2xsLmpzIiwiLi4vc291cmNlL2R5bmFtaWNzL2Zvcm1faW5pdGlhbGl6ZU5leHRTZWN0aW9uLmpzIiwiLi4vc291cmNlL2R5bmFtaWNzL2Zvcm1fc2VjdGlvbi1mb3VydGguanMiLCIuLi9zb3VyY2UvZHluYW1pY3MvZm9ybV9zZWN0aW9uLW9uZS5qcyIsIi4uL3NvdXJjZS9keW5hbWljcy9vYmplY3QtdG8tYXJyYXkuanMiLCIuLi9zb3VyY2UvZHluYW1pY3MvZm9ybV9zZWN0aW9uLXRocmVlLmpzIiwiLi4vc291cmNlL2R5bmFtaWNzL2Zvcm1fc2VjdGlvbi10d28uanMiLCIuLi9zb3VyY2UvZHluYW1pY3MvZm9ybV9zZWN0aW9uLWZpZnRoLmpzIiwiLi4vc291cmNlL2R5bmFtaWNzL21vY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVHdWlkZSlcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVHdWlkZSgpIHtcclxuICBoaWRlVXNlckd1aWRlKCk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgYXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpO1xyXG4gICAgYXNpZGUuY2xhc3NMaXN0LmFkZCgnb25Mb2FkJyk7XHJcbiAgfSwgMClcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZVVzZXJHdWlkZSgpIHtcclxuICBsZXQgb3JubSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hc2lkZS1oZWFkJylcclxuICBvcm5tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlQW5kSGlkZUFzaWRlKVxyXG4gIGxldCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlci1ndWlkZV9oaWRlJylcclxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByb3RhdGVBbmRIaWRlQXNpZGUpXHJcbn1cclxubGV0IGNvbnRyb2xsZXIgPSAwXHJcblxyXG5mdW5jdGlvbiByb3RhdGVBbmRIaWRlQXNpZGUoKSB7XHJcbiAgbGV0IGFzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKVxyXG4gIGlmIChjb250cm9sbGVyID09PSAwKSB7XHJcbiAgICBsZXQgaGVhZEJlbHQgPSBhc2lkZS5xdWVyeVNlbGVjdG9yKCcuYXNpZGUtaGVhZCcpO1xyXG4gICAgbGV0IHBpZWNlID0gaGVhZEJlbHQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgYXNpZGUuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSg5MGRlZyknXHJcbiAgICBsZXQgYXcgPSBhc2lkZS5vZmZzZXRXaWR0aFxyXG4gICAgbGV0IGFoID0gYXNpZGUub2Zmc2V0SGVpZ2h0XHJcbiAgICBsZXQgd3NwID0gYWggKyAoKGF3IC0gYWgpIC8gMilcclxuICAgIGxldCB4ID0gKHdzcCAqIC0xKSArIHBpZWNlXHJcbiAgICBsZXQgeSA9IHggKyAncHgnXHJcbiAgICBsZXQgeiA9ICgoYXcgLSBhaCkgLyAyKSArICdweCdcclxuICAgIGFzaWRlLnN0eWxlLmxlZnQgPSB5XHJcbiAgICBhc2lkZS5zdHlsZS5ib3R0b20gPSB6XHJcbiAgICBjb250cm9sbGVyID0gMVxyXG4gIH0gZWxzZSBpZiAoY29udHJvbGxlciA9PT0gMSkge1xyXG4gICAgYXNpZGUuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSgwZGVnKSdcclxuICAgIGFzaWRlLnN0eWxlLmxlZnQgPSAwXHJcbiAgICBhc2lkZS5zdHlsZS5ib3R0b20gPSAwXHJcbiAgICBjb250cm9sbGVyID0gMFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGd1aWRlUmVhY3RzKGkpIHtcclxuICBsZXQgYXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpO1xyXG4gIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ29uQWR2aWNlJyk7XHJcbiAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZSgnb25BZHZpY2VCJyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe3NoYWtlVG9Gb2N1c1VzZXJzQXR0ZW50aW9uKGFzaWRlKX0sMCk7XHJcbiAgbGV0IGd1aWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFzaWRlLWZvb3QgLnVzZXItZ3VpZGUnKTtcclxuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXNpZGUtZm9vdF90aXRsZScpO1xyXG4gIGxldCBhcnIgPSBbXHJcbiAgICAnR2R5IHdwaXN6ZXN6IGltacSZLCBwcnp5ZG9tZWsgaSB6YXdvxYJhbmllLCBwbyB6YXR3aWVyZHplbml1IHptaWFuIHBvamF3aSBzacSZIG5hc3TEmXBuYSBjesSZxZvEhyBmb3JtdWxhcnphLicsXHJcbiAgICAnUG8gd3lib3J6ZSBrbGFzeSwgcG9qYXdpIHNpZSBva25vIHd5Ym9ydSBhdGFrdSBzcG/Fm3LDs2QgdWRlcnplxYQgY2hhcmFrdGVyeXN0eWN6bnljaCBkbGEgdGVqIHBvc3RhY2kuJyxcclxuICAgICdXeWJpZXJ6IHVkZXJ6ZW5pZSwga2xpa2FqxIVjIHcgc8WCb3dvIG9waXN1asSFY2UgamUuIFByenkga2HFvGR5bSBlcGl0ZWNpZSB3aWRuaWVqZSBjaGFyYWt0ZXJ5c3R5a2EgY2lvc3UgdyBJa29uYWNoIMW7eXdpb8WCw7N3IGkgSWtvbmFjaCBVZGVyemXFhC4nLFxyXG4gICAgJ1d5bXnFm2wgbmF6d2UgZGxhIHVkZXJ6ZW5pYSB6IHBvcHJ6ZWRuaWVnbyBrcm9rdS4gR2R5IGrEhSB6YXR3aWVyZHppc3osIHBvamF3aSBzaWUga29sZWpuYSBjemXFm8SHIGthcnR5IHBvc3RhY2kuJyxcclxuICAgICdQbyB3eWJvcnplIGplZG5laiBvcGNqaSB6IGthxbxkZWogbGlzdHksIHBvamF3aSBzaWUga29sZWpuYSBjemXFm8SHIGthcnR5IHBvc3RhY2kuJyxcclxuICAgICdLbGlrbmlqIHR5bGUgb3BjamksIGlsZSBjaGNlc3ouIEthxbxkeSB6ZXN0YXcgKGN6eWxpIG1vYyBpIHBpZXRubykgemFiaWVyYSBjaSBwZXduxIUgaWxvxZvEhyBwdW5rdMOzdyBNxIVkcm/Fm2NpLicsXHJcbiAgICAnUm96ZGFqIHBvem9zdGHFgmUgcHVua3R5IG3EhWRyb8WbY2kgbmEgd3Nww7PFgmN6eW5uaWtpIHBvc3RhY2k6IMW7eWNpZSwgTcSFZHJvxZvEhywgUnVjaCBpIER6aWHFgmFuaWUuJyxcclxuICAgICdSb3pkYWogcG96b3N0YcWCZSBwdW5rdHkgbcSFZHJvxZtjaSBuYSB3c3DDs8WCY3p5bm5pa2kgcG9zdGFjaTogxbt5Y2llLCBNxIVkcm/Fm8SHLCBSdWNoIGkgRHppYcWCYW5pZS4nXHJcbiAgXVxyXG4gIGd1aWRlLmlubmVyVGV4dCA9IGFycltpXVxyXG4gIGxldCBhcnJCID0gW1xyXG4gICAgJ3RvxbxzYW1vxZvEhzonLFxyXG4gICAgJ2tsYXNhOicsXHJcbiAgICAnYXRhazonLFxyXG4gICAgJ25hendhIGF0YWt1OicsXHJcbiAgICAnb2Jyb25hOicsXHJcbiAgICAnemRvbG5vxZvEhyBpIHPFgmFib8WbxIc6JyxcclxuICAgICdhdHJ5YnV0eTonLFxyXG4gICAgJ2F0cnlidXR5OidcclxuICBdXHJcbiAgdGl0bGUuaW5uZXJUZXh0ID0gYXJyQltpXVxyXG59XHJcbmZ1bmN0aW9uIHNoYWtlVG9Gb2N1c1VzZXJzQXR0ZW50aW9uKGFzaWRlKSB7XHJcbiAgaWYgKGNvbnRyb2xsZXIgPT09IDEpIHtcclxuICAgIGxldCBoZWFkQmVsdCA9IGFzaWRlLnF1ZXJ5U2VsZWN0b3IoJy5hc2lkZS1oZWFkJyk7XHJcbiAgICBsZXQgcGllY2UgPSBoZWFkQmVsdC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBhc2lkZS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlKDkwZGVnKSc7XHJcbiAgICBsZXQgYXcgPSBhc2lkZS5vZmZzZXRXaWR0aDtcclxuICAgIGxldCBhaCA9IGFzaWRlLm9mZnNldEhlaWdodDtcclxuICAgIGxldCB3c3AgPSBhaCArICgoYXcgLSBhaCkgLyAyKTtcclxuICAgIGxldCB4ID0gKHdzcCAqIC0xKSArIHBpZWNlO1xyXG4gICAgbGV0IHkgPSB4ICsgJ3B4JztcclxuICAgIGxldCB6ID0gKChhdyAtIGFoKSAvIDIpICsgJ3B4JztcclxuICAgIGFzaWRlLnN0eWxlLmxlZnQgPSB5O1xyXG4gICAgYXNpZGUuc3R5bGUuYm90dG9tID0gejtcclxuICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoJ29uQWR2aWNlJyk7XHJcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyID09PSAwKSB7XHJcbiAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKCdvbkFkdmljZUInKTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBpdGVyYXRvck9mUG9pbnRzTGVmdCA9IHtcclxuICBsZWZ0OiAyMCxcclxuICBzcGVudE9uQXR0YWNrOiAwLFxyXG4gIGl0ZXJhdG9yKGNvbnQsIHgpIHtcclxuICAgIGxldCBpdGVyRGV2aWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFzaWRlLWJvZHlfaG93LW11Y2gnKVxyXG4gICAgbGV0IG9wdCA9IGNvbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzX2ZpZWxkc2V0LWJfY29udGFpbmVyX3NlbGVjdC1jb250YWluZXJfaW1nLXBhcnQtY29udGFpbmVyX29wdCcpW3hdXHJcbiAgICBsZXQgcG9pbnRzID0gb3B0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpXHJcbiAgICBsZXQgYW1vdW50ID0gKHBvaW50cy5sZW5ndGggLSAxKVxyXG4gICAgbGV0IGJpbGFucyA9IGFtb3VudCAtIHRoaXMuc3BlbnRPbkF0dGFja1xyXG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5sZWZ0IC0gYmlsYW5zXHJcbiAgICB0aGlzLnNwZW50T25BdHRhY2sgPSBhbW91bnRcclxuICAgIGl0ZXJEZXZpY2UuaW5uZXJUZXh0ID0gJ1Bvem9zdGHFgm8nICsgJyAnICsgdGhpcy5sZWZ0ICsgJ3gnXHJcbiAgICB0aGlzLmFuaW1hdGVPcHRzU3BlbmRpbmcob3B0LCBhbW91bnQpO1xyXG4gIH0sXHJcbiAgZGVsZXRhdG9yKCkge1xyXG4gICAgbGV0IGl0ZXJEZXZpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXNpZGUtYm9keV9ob3ctbXVjaCcpXHJcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmxlZnQgKyB0aGlzLnNwZW50T25BdHRhY2tcclxuICAgIHRoaXMuc3BlbnRPbkF0dGFjayA9IDBcclxuICAgIGl0ZXJEZXZpY2UuaW5uZXJUZXh0ID0gJ1Bvem9zdGHFgm8nICsgJyAnICsgdGhpcy5sZWZ0ICsgJ3gnXHJcbiAgfSxcclxuICBhbmltYXRlT3B0c1NwZW5kaW5nKG9wdCwgYW1vdW50KSB7XHJcbiAgICBsZXQgY29pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0lNRycpO1xyXG4gICAgY29pbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ljb25zL2lrb25hLXBvdGVnLnN2ZycpO1xyXG4gICAgY29pbi5jbGFzc0xpc3QuYWRkKCdpdElzQ29pbicpO1xyXG4gICAgbGV0IGF4UyA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgbGV0IGF4WCA9IG9wdC5vZmZzZXRUb3A7XHJcbiAgICBsZXQgYXhaID0gYXhYIC0gYXhTO1xyXG4gICAgbGV0IGF4WSA9IG9wdC5vZmZzZXRMZWZ0O1xyXG4gICAgY29pbi5zdHlsZS50b3AgPSBheFogKyAncHgnO1xyXG4gICAgY29pbi5zdHlsZS5sZWZ0ID0gYXhZICsgJ3B4JztcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChjb2luKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb2luLnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICAgIGNvaW4uc3R5bGUudG9wID0gJzkwJSc7XHJcbiAgICAgIGNvaW4uc3R5bGUud2lkdGggPSAnNTVweCc7XHJcbiAgICAgIGNvaW4uc3R5bGUuaGVpZ2h0ID0gJzU1cHgnO1xyXG4gICAgfSwgMCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnJlbW92ZUNoaWxkKGNvaW4pO1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLmNsYXNzTGlzdC5hZGQoJ29uQWR2aWNlJyk7XHJcbiAgICB9LCA1NTApO1xyXG4gIH0sXHJcbiAgaXRlcmF0b3JCKGludGVnZXIpIHtcclxuICAgIGxldCBpdGVyRGV2aWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFzaWRlLWJvZHlfaG93LW11Y2gnKVxyXG4gICAgdGhpcy5sZWZ0ID0gdGhpcy5sZWZ0ICsgaW50ZWdlclxyXG4gICAgaXRlckRldmljZS5pbm5lclRleHQgPSAnUG96b3N0YcWCbycgKyAnICcgKyB0aGlzLmxlZnQgKyAneCdcclxuICB9LFxyXG4gIGRlbGV0YXRvckIoaW50ZWdlcikge1xyXG4gICAgbGV0IGl0ZXJEZXZpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXNpZGUtYm9keV9ob3ctbXVjaCcpXHJcbiAgICB0aGlzLmxlZnQgPSB0aGlzLmxlZnQgLSBpbnRlZ2VyXHJcbiAgICBpdGVyRGV2aWNlLmlubmVyVGV4dCA9ICdQb3pvc3RhxYJvJyArICcgJyArIHRoaXMubGVmdCArICd4J1xyXG4gIH0sXHJcbiAgZXF1YWxpemF0b3IoKSB7XHJcbiAgICBsZXQgaXRlckRldmljZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hc2lkZS1ib2R5X2hvdy1tdWNoJylcclxuICAgIGl0ZXJEZXZpY2UuaW5uZXJUZXh0ID0gJ1Bvem9zdGHFgm8nICsgJyAnICsgdGhpcy5sZWZ0ICsgJ3gnXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGl0ZXJhdG9yT2ZQb2ludHNMZWZ0IiwiaW1wb3J0IGl0ZXJhdG9yT2ZQb2ludHNMZWZ0IGZyb20gJy4vYXNpZGUuanMnO1xyXG5pbXBvcnQge1xyXG4gICAgc2hvd0J0bk9mQWNjZXB0YW5jZVxyXG59IGZyb20gJy4vZm9ybV9pbml0aWFsaXplTmV4dFNlY3Rpb24uanMnO1xyXG4ndXNlIHN0cmljdCc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBsZXQgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkcy0yX2ZpZWxkc2V0LWRfY29udGFpbmVyX2F0cnliIC4tLWJlbHRfaWNvbi1jb250YWluZXInKTtcclxuICAgIGxldCBiZWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkcy0yX2ZpZWxkc2V0LWRfY29udGFpbmVyX2F0cnliIC4tLWJlbHRfYm9keS1jb250YWluZXJfYm9keScpO1xyXG4gICAgbGV0IGl0ZXIgPSBidG5zLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgPiAtMSkge1xyXG4gICAgICAgICAgICBsZXQgYXR0cnliID0gYnRuc1tpXTtcclxuICAgICAgICAgICAgbGV0IGJlbHQgPSBiZWx0c1tpXTtcclxuICAgICAgICAgICAgYXR0cnliLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yT2ZQb2ludHNMZWZ0LmxlZnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkUG9pbnQoYmVsdClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQb2ludChiZWx0KSB7XHJcbiAgICBsZXQgSU1HID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSU1HJyk7XHJcbiAgICBJTUcuc2V0QXR0cmlidXRlKCdzcmMnLCAnaWNvbnMvaWtvbmEtcG90ZWcuc3ZnJyk7XHJcbiAgICBiZWx0LmFwcGVuZENoaWxkKElNRyk7XHJcbiAgICBpdGVyYXRvck9mUG9pbnRzTGVmdC5sZWZ0LS07XHJcbiAgICBpdGVyYXRvck9mUG9pbnRzTGVmdC5lcXVhbGl6YXRvcigpO1xyXG4gICAgSU1HLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRlbGV0ZVRoaXNJTUcoSU1HKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGhpc0lNRyh4KSB7XHJcbiAgICB4LnJlbW92ZSgpO1xyXG4gICAgaXRlcmF0b3JPZlBvaW50c0xlZnQubGVmdCsrO1xyXG4gICAgaXRlcmF0b3JPZlBvaW50c0xlZnQuZXF1YWxpemF0b3IoKTtcclxufVxyXG5cclxubGV0IGNvbnRyb2xsZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0xhc3RCdG5PZkFjY2VwdGFuY2UoKSB7XHJcbiAgICBpZiAoY29udHJvbGxlciA9PT0gMCkge1xyXG4gICAgICAgIGxldCBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lci5zZXZlbnRoU2VjdGlvbkJ0blwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgYnRuT2ZUaGlzU2VjdGlvbiA9IGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lcl9idG5cIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2hvd0J0bk9mQWNjZXB0YW5jZShidG5PZlRoaXNTZWN0aW9uLCBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbik7XHJcbiAgICAgICAgY29udHJvbGxlciA9IDE7XHJcbiAgICAgICAgY2xpY2tCdG5PZkFjY2VwdGFuY2UoYnRuT2ZUaGlzU2VjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2xpY2tCdG5PZkFjY2VwdGFuY2UoYnRuKXtcclxuICAgIGxldCBjbGlja0J0biA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XHJcbiAgICBjbGlja0J0bi5pbml0TW91c2VFdmVudCgnY2xpY2snKTtcclxuICAgIGJ0bi5kaXNwYXRjaEV2ZW50KGNsaWNrQnRuKTtcclxufSIsIi8qKlxuICogWmVuc2Nyb2xsIDQuMC4yXG4gKiBodHRwczovL2dpdGh1Yi5jb20vemVuZ2Fib3IvemVuc2Nyb2xsL1xuICpcbiAqIENvcHlyaWdodCAyMDE14oCTMjAxOCBHYWJvciBMZW5hcmRcbiAqXG4gKiBUaGlzIGlzIGZyZWUgYW5kIHVuZW5jdW1iZXJlZCBzb2Z0d2FyZSByZWxlYXNlZCBpbnRvIHRoZSBwdWJsaWMgZG9tYWluLlxuICogXG4gKiBBbnlvbmUgaXMgZnJlZSB0byBjb3B5LCBtb2RpZnksIHB1Ymxpc2gsIHVzZSwgY29tcGlsZSwgc2VsbCwgb3JcbiAqIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSwgZWl0aGVyIGluIHNvdXJjZSBjb2RlIGZvcm0gb3IgYXMgYSBjb21waWxlZFxuICogYmluYXJ5LCBmb3IgYW55IHB1cnBvc2UsIGNvbW1lcmNpYWwgb3Igbm9uLWNvbW1lcmNpYWwsIGFuZCBieSBhbnlcbiAqIG1lYW5zLlxuICogXG4gKiBJbiBqdXJpc2RpY3Rpb25zIHRoYXQgcmVjb2duaXplIGNvcHlyaWdodCBsYXdzLCB0aGUgYXV0aG9yIG9yIGF1dGhvcnNcbiAqIG9mIHRoaXMgc29mdHdhcmUgZGVkaWNhdGUgYW55IGFuZCBhbGwgY29weXJpZ2h0IGludGVyZXN0IGluIHRoZVxuICogc29mdHdhcmUgdG8gdGhlIHB1YmxpYyBkb21haW4uIFdlIG1ha2UgdGhpcyBkZWRpY2F0aW9uIGZvciB0aGUgYmVuZWZpdFxuICogb2YgdGhlIHB1YmxpYyBhdCBsYXJnZSBhbmQgdG8gdGhlIGRldHJpbWVudCBvZiBvdXIgaGVpcnMgYW5kXG4gKiBzdWNjZXNzb3JzLiBXZSBpbnRlbmQgdGhpcyBkZWRpY2F0aW9uIHRvIGJlIGFuIG92ZXJ0IGFjdCBvZlxuICogcmVsaW5xdWlzaG1lbnQgaW4gcGVycGV0dWl0eSBvZiBhbGwgcHJlc2VudCBhbmQgZnV0dXJlIHJpZ2h0cyB0byB0aGlzXG4gKiBzb2Z0d2FyZSB1bmRlciBjb3B5cmlnaHQgbGF3LlxuICogXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICogRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4gKiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuXG4gKiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUlxuICogT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsXG4gKiBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1JcbiAqIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqIFxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHBsZWFzZSByZWZlciB0byA8aHR0cDovL3VubGljZW5zZS5vcmc+XG4gKiBcbiAqL1xuXG4vKmpzaGludCBkZXZlbDp0cnVlLCBhc2k6dHJ1ZSAqL1xuXG4vKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSAqL1xuXG5cbihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkoKSlcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcblx0fSBlbHNlIHtcblx0XHQoZnVuY3Rpb24gaW5zdGFsbCgpIHtcblx0XHRcdC8vIFRvIG1ha2Ugc3VyZSBaZW5zY3JvbGwgY2FuIGJlIHJlZmVyZW5jZWQgZnJvbSB0aGUgaGVhZGVyLCBiZWZvcmUgYGJvZHlgIGlzIGF2YWlsYWJsZVxuXHRcdFx0aWYgKGRvY3VtZW50ICYmIGRvY3VtZW50LmJvZHkpIHtcblx0XHRcdFx0cm9vdC56ZW5zY3JvbGwgPSBmYWN0b3J5KClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJldHJ5IDltcyBsYXRlclxuXHRcdFx0XHRzZXRUaW1lb3V0KGluc3RhbGwsIDkpXG5cdFx0XHR9XG5cdFx0fSkoKVxuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCJcblxuXG5cdC8vIERldGVjdCBpZiB0aGUgYnJvd3NlciBhbHJlYWR5IHN1cHBvcnRzIG5hdGl2ZSBzbW9vdGggc2Nyb2xsaW5nIChlLmcuLCBGaXJlZm94IDM2KyBhbmQgQ2hyb21lIDQ5KykgYW5kIGl0IGlzIGVuYWJsZWQ6XG5cdHZhciBpc05hdGl2ZVNtb290aFNjcm9sbEVuYWJsZWRPbiA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0cmV0dXJuIGVsZW0gJiYgXCJnZXRDb21wdXRlZFN0eWxlXCIgaW4gd2luZG93ICYmXG5cdFx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKVtcInNjcm9sbC1iZWhhdmlvclwiXSA9PT0gXCJzbW9vdGhcIlxuXHR9XG5cblxuXHQvLyBFeGl0IGlmIGl04oCZcyBub3QgYSBicm93c2VyIGVudmlyb25tZW50OlxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiZG9jdW1lbnRcIiBpbiB3aW5kb3cpKSB7XG5cdFx0cmV0dXJuIHt9XG5cdH1cblxuXG5cdHZhciBtYWtlU2Nyb2xsZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkZWZhdWx0RHVyYXRpb24sIGVkZ2VPZmZzZXQpIHtcblxuXHRcdC8vIFVzZSBkZWZhdWx0cyBpZiBub3QgcHJvdmlkZWRcblx0XHRkZWZhdWx0RHVyYXRpb24gPSBkZWZhdWx0RHVyYXRpb24gfHwgOTk5IC8vbXNcblx0XHRpZiAoIWVkZ2VPZmZzZXQgJiYgZWRnZU9mZnNldCAhPT0gMCkge1xuXHRcdFx0Ly8gV2hlbiBzY3JvbGxpbmcsIHRoaXMgYW1vdW50IG9mIGRpc3RhbmNlIGlzIGtlcHQgZnJvbSB0aGUgZWRnZXMgb2YgdGhlIGNvbnRhaW5lcjpcblx0XHRcdGVkZ2VPZmZzZXQgPSA5IC8vcHhcblx0XHR9XG5cblx0XHQvLyBIYW5kbGluZyB0aGUgbGlmZS1jeWNsZSBvZiB0aGUgc2Nyb2xsZXJcblx0XHR2YXIgc2Nyb2xsVGltZW91dElkXG5cdFx0dmFyIHNldFNjcm9sbFRpbWVvdXRJZCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuXHRcdFx0c2Nyb2xsVGltZW91dElkID0gbmV3VmFsdWVcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTdG9wIHRoZSBjdXJyZW50IHNtb290aCBzY3JvbGwgb3BlcmF0aW9uIGltbWVkaWF0ZWx5XG5cdFx0ICovXG5cdFx0dmFyIHN0b3BTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQoc2Nyb2xsVGltZW91dElkKVxuXHRcdFx0c2V0U2Nyb2xsVGltZW91dElkKDApXG5cdFx0fVxuXG5cdFx0dmFyIGdldFRvcFdpdGhFZGdlT2Zmc2V0ID0gZnVuY3Rpb24gKGVsZW0pIHtcblx0XHRcdHJldHVybiBNYXRoLm1heCgwLCBjb250YWluZXIuZ2V0VG9wT2YoZWxlbSkgLSBlZGdlT2Zmc2V0KVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNjcm9sbHMgdG8gYSBzcGVjaWZpYyB2ZXJ0aWNhbCBwb3NpdGlvbiBpbiB0aGUgZG9jdW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3RhcmdldFl9IFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiB3aXRoaW4gdGhlIGRvY3VtZW50LlxuXHRcdCAqIEBwYXJhbSB7ZHVyYXRpb259IE9wdGlvbmFsbHkgdGhlIGR1cmF0aW9uIG9mIHRoZSBzY3JvbGwgb3BlcmF0aW9uLlxuXHRcdCAqICAgICAgICBJZiBub3QgcHJvdmlkZWQgdGhlIGRlZmF1bHQgZHVyYXRpb24gaXMgdXNlZC5cblx0XHQgKiBAcGFyYW0ge29uRG9uZX0gQW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBvbmNlIHRoZSBzY3JvbGwgZmluaXNoZWQuXG5cdFx0ICovXG5cdFx0dmFyIHNjcm9sbFRvWSA9IGZ1bmN0aW9uICh0YXJnZXRZLCBkdXJhdGlvbiwgb25Eb25lKSB7XG5cdFx0XHRzdG9wU2Nyb2xsKClcblx0XHRcdGlmIChkdXJhdGlvbiA9PT0gMCB8fCAoZHVyYXRpb24gJiYgZHVyYXRpb24gPCAwKSB8fCBpc05hdGl2ZVNtb290aFNjcm9sbEVuYWJsZWRPbihjb250YWluZXIuYm9keSkpIHtcblx0XHRcdFx0Y29udGFpbmVyLnRvWSh0YXJnZXRZKVxuXHRcdFx0XHRpZiAob25Eb25lKSB7XG5cdFx0XHRcdFx0b25Eb25lKClcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHN0YXJ0WSA9IGNvbnRhaW5lci5nZXRZKClcblx0XHRcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5tYXgoMCwgdGFyZ2V0WSkgLSBzdGFydFlcblx0XHRcdFx0dmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cdFx0XHRcdGR1cmF0aW9uID0gZHVyYXRpb24gfHwgTWF0aC5taW4oTWF0aC5hYnMoZGlzdGFuY2UpLCBkZWZhdWx0RHVyYXRpb24pO1xuXHRcdFx0XHQoZnVuY3Rpb24gbG9vcFNjcm9sbCgpIHtcblx0XHRcdFx0XHRzZXRTY3JvbGxUaW1lb3V0SWQoc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQvLyBDYWxjdWxhdGUgcGVyY2VudGFnZTpcblx0XHRcdFx0XHRcdHZhciBwID0gTWF0aC5taW4oMSwgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uKVxuXHRcdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIHRoZSBhYnNvbHV0ZSB2ZXJ0aWNhbCBwb3NpdGlvbjpcblx0XHRcdFx0XHRcdHZhciB5ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihzdGFydFkgKyBkaXN0YW5jZSoocCA8IDAuNSA/IDIqcCpwIDogcCooNCAtIHAqMiktMSkpKVxuXHRcdFx0XHRcdFx0Y29udGFpbmVyLnRvWSh5KVxuXHRcdFx0XHRcdFx0aWYgKHAgPCAxICYmIChjb250YWluZXIuZ2V0SGVpZ2h0KCkgKyB5KSA8IGNvbnRhaW5lci5ib2R5LnNjcm9sbEhlaWdodCkge1xuXHRcdFx0XHRcdFx0XHRsb29wU2Nyb2xsKClcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoc3RvcFNjcm9sbCwgOTkpIC8vIHdpdGggY29vbGRvd24gdGltZVxuXHRcdFx0XHRcdFx0XHRpZiAob25Eb25lKSB7XG5cdFx0XHRcdFx0XHRcdFx0b25Eb25lKClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIDkpKVxuXHRcdFx0XHR9KSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2Nyb2xscyB0byB0aGUgdG9wIG9mIGEgc3BlY2lmaWMgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7ZWxlbX0gVGhlIGVsZW1lbnQgdG8gc2Nyb2xsIHRvLlxuXHRcdCAqIEBwYXJhbSB7ZHVyYXRpb259IE9wdGlvbmFsbHkgdGhlIGR1cmF0aW9uIG9mIHRoZSBzY3JvbGwgb3BlcmF0aW9uLlxuXHRcdCAqIEBwYXJhbSB7b25Eb25lfSBBbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIG9uY2UgdGhlIHNjcm9sbCBmaW5pc2hlZC5cblx0XHQgKi9cblx0XHR2YXIgc2Nyb2xsVG9FbGVtID0gZnVuY3Rpb24gKGVsZW0sIGR1cmF0aW9uLCBvbkRvbmUpIHtcblx0XHRcdHNjcm9sbFRvWShnZXRUb3BXaXRoRWRnZU9mZnNldChlbGVtKSwgZHVyYXRpb24sIG9uRG9uZSlcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTY3JvbGxzIGFuIGVsZW1lbnQgaW50byB2aWV3IGlmIG5lY2Vzc2FyeS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7ZWxlbX0gVGhlIGVsZW1lbnQuXG5cdFx0ICogQHBhcmFtIHtkdXJhdGlvbn0gT3B0aW9uYWxseSB0aGUgZHVyYXRpb24gb2YgdGhlIHNjcm9sbCBvcGVyYXRpb24uXG5cdFx0ICogQHBhcmFtIHtvbkRvbmV9IEFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgb25jZSB0aGUgc2Nyb2xsIGZpbmlzaGVkLlxuXHRcdCAqL1xuXHRcdHZhciBzY3JvbGxJbnRvVmlldyA9IGZ1bmN0aW9uIChlbGVtLCBkdXJhdGlvbiwgb25Eb25lKSB7XG5cdFx0XHR2YXIgZWxlbUhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cdFx0XHR2YXIgZWxlbUJvdHRvbSA9IGNvbnRhaW5lci5nZXRUb3BPZihlbGVtKSArIGVsZW1IZWlnaHRcblx0XHRcdHZhciBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXIuZ2V0SGVpZ2h0KClcblx0XHRcdHZhciB5ID0gY29udGFpbmVyLmdldFkoKVxuXHRcdFx0dmFyIGNvbnRhaW5lckJvdHRvbSA9IHkgKyBjb250YWluZXJIZWlnaHRcblx0XHRcdGlmIChnZXRUb3BXaXRoRWRnZU9mZnNldChlbGVtKSA8IHkgfHwgKGVsZW1IZWlnaHQgKyBlZGdlT2Zmc2V0KSA+IGNvbnRhaW5lckhlaWdodCkge1xuXHRcdFx0XHQvLyBFbGVtZW50IGlzIGNsaXBwZWQgYXQgdG9wIG9yIGlzIGhpZ2hlciB0aGFuIHNjcmVlbi5cblx0XHRcdFx0c2Nyb2xsVG9FbGVtKGVsZW0sIGR1cmF0aW9uLCBvbkRvbmUpXG5cdFx0XHR9IGVsc2UgaWYgKChlbGVtQm90dG9tICsgZWRnZU9mZnNldCkgPiBjb250YWluZXJCb3R0b20pIHtcblx0XHRcdFx0Ly8gRWxlbWVudCBpcyBjbGlwcGVkIGF0IHRoZSBib3R0b20uXG5cdFx0XHRcdHNjcm9sbFRvWShlbGVtQm90dG9tIC0gY29udGFpbmVySGVpZ2h0ICsgZWRnZU9mZnNldCwgZHVyYXRpb24sIG9uRG9uZSlcblx0XHRcdH0gZWxzZSBpZiAob25Eb25lKSB7XG5cdFx0XHRcdG9uRG9uZSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2Nyb2xscyB0byB0aGUgY2VudGVyIG9mIGFuIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2VsZW19IFRoZSBlbGVtZW50LlxuXHRcdCAqIEBwYXJhbSB7ZHVyYXRpb259IE9wdGlvbmFsbHkgdGhlIGR1cmF0aW9uIG9mIHRoZSBzY3JvbGwgb3BlcmF0aW9uLlxuXHRcdCAqIEBwYXJhbSB7b2Zmc2V0fSBPcHRpb25hbGx5IHRoZSBvZmZzZXQgb2YgdGhlIHRvcCBvZiB0aGUgZWxlbWVudCBmcm9tIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlbi5cblx0XHQgKiAgICAgICAgQSB2YWx1ZSBvZiAwIGlzIGlnbm9yZWQuXG5cdFx0ICogQHBhcmFtIHtvbkRvbmV9IEFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgb25jZSB0aGUgc2Nyb2xsIGZpbmlzaGVkLlxuXHRcdCAqL1xuXHRcdHZhciBzY3JvbGxUb0NlbnRlck9mID0gZnVuY3Rpb24gKGVsZW0sIGR1cmF0aW9uLCBvZmZzZXQsIG9uRG9uZSkge1xuXHRcdFx0c2Nyb2xsVG9ZKE1hdGgubWF4KDAsIGNvbnRhaW5lci5nZXRUb3BPZihlbGVtKSAtIGNvbnRhaW5lci5nZXRIZWlnaHQoKS8yICsgKG9mZnNldCB8fCBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodC8yKSksIGR1cmF0aW9uLCBvbkRvbmUpXG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlcyBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIHNjcm9sbGVyLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtuZXdEZWZhdWx0RHVyYXRpb259IE9wdGlvbmFsbHkgYSBuZXcgdmFsdWUgZm9yIGRlZmF1bHQgZHVyYXRpb24sIHVzZWQgZm9yIGVhY2ggc2Nyb2xsIG1ldGhvZCBieSBkZWZhdWx0LlxuXHRcdCAqICAgICAgICBJZ25vcmVkIGlmIG51bGwgb3IgdW5kZWZpbmVkLlxuXHRcdCAqIEBwYXJhbSB7bmV3RWRnZU9mZnNldH0gT3B0aW9uYWxseSBhIG5ldyB2YWx1ZSBmb3IgdGhlIGVkZ2Ugb2Zmc2V0LCB1c2VkIGJ5IGVhY2ggc2Nyb2xsIG1ldGhvZCBieSBkZWZhdWx0LiBJZ25vcmVkIGlmIG51bGwgb3IgdW5kZWZpbmVkLlxuXHRcdCAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcy5cblx0XHQgKi9cblx0XHR2YXIgc2V0dXAgPSBmdW5jdGlvbiAobmV3RGVmYXVsdER1cmF0aW9uLCBuZXdFZGdlT2Zmc2V0KSB7XG5cdFx0XHRpZiAobmV3RGVmYXVsdER1cmF0aW9uID09PSAwIHx8IG5ld0RlZmF1bHREdXJhdGlvbikge1xuXHRcdFx0XHRkZWZhdWx0RHVyYXRpb24gPSBuZXdEZWZhdWx0RHVyYXRpb25cblx0XHRcdH1cblx0XHRcdGlmIChuZXdFZGdlT2Zmc2V0ID09PSAwIHx8IG5ld0VkZ2VPZmZzZXQpIHtcblx0XHRcdFx0ZWRnZU9mZnNldCA9IG5ld0VkZ2VPZmZzZXRcblx0XHRcdH1cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGRlZmF1bHREdXJhdGlvbjogZGVmYXVsdER1cmF0aW9uLFxuXHRcdFx0XHRlZGdlT2Zmc2V0OiBlZGdlT2Zmc2V0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHNldHVwOiBzZXR1cCxcblx0XHRcdHRvOiBzY3JvbGxUb0VsZW0sXG5cdFx0XHR0b1k6IHNjcm9sbFRvWSxcblx0XHRcdGludG9WaWV3OiBzY3JvbGxJbnRvVmlldyxcblx0XHRcdGNlbnRlcjogc2Nyb2xsVG9DZW50ZXJPZixcblx0XHRcdHN0b3A6IHN0b3BTY3JvbGwsXG5cdFx0XHRtb3Zpbmc6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICEhc2Nyb2xsVGltZW91dElkIH0sXG5cdFx0XHRnZXRZOiBjb250YWluZXIuZ2V0WSxcblx0XHRcdGdldFRvcE9mOiBjb250YWluZXIuZ2V0VG9wT2Zcblx0XHR9XG5cblx0fVxuXG5cblx0dmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0dmFyIGdldERvY1kgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3cuc2Nyb2xsWSB8fCBkb2NFbGVtLnNjcm9sbFRvcCB9XG5cblx0Ly8gQ3JlYXRlIGEgc2Nyb2xsZXIgZm9yIHRoZSBkb2N1bWVudDpcblx0dmFyIHplbnNjcm9sbCA9IG1ha2VTY3JvbGxlcih7XG5cdFx0Ym9keTogZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LFxuXHRcdHRvWTogZnVuY3Rpb24gKHkpIHsgd2luZG93LnNjcm9sbFRvKDAsIHkpIH0sXG5cdFx0Z2V0WTogZ2V0RG9jWSxcblx0XHRnZXRIZWlnaHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2NFbGVtLmNsaWVudEhlaWdodCB9LFxuXHRcdGdldFRvcE9mOiBmdW5jdGlvbiAoZWxlbSkgeyByZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBnZXREb2NZKCkgLSBkb2NFbGVtLm9mZnNldFRvcCB9XG5cdH0pXG5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHNjcm9sbGVyIGZyb20gdGhlIHByb3ZpZGVkIGNvbnRhaW5lciBlbGVtZW50IChlLmcuLCBhIERJVilcblx0ICpcblx0ICogQHBhcmFtIHtzY3JvbGxDb250YWluZXJ9IFRoZSB2ZXJ0aWNhbCBwb3NpdGlvbiB3aXRoaW4gdGhlIGRvY3VtZW50LlxuXHQgKiBAcGFyYW0ge2RlZmF1bHREdXJhdGlvbn0gT3B0aW9uYWxseSBhIHZhbHVlIGZvciBkZWZhdWx0IGR1cmF0aW9uLCB1c2VkIGZvciBlYWNoIHNjcm9sbCBtZXRob2QgYnkgZGVmYXVsdC5cblx0ICogICAgICAgIElnbm9yZWQgaWYgMCBvciBudWxsIG9yIHVuZGVmaW5lZC5cblx0ICogQHBhcmFtIHtlZGdlT2Zmc2V0fSBPcHRpb25hbGx5IGEgdmFsdWUgZm9yIHRoZSBlZGdlIG9mZnNldCwgdXNlZCBieSBlYWNoIHNjcm9sbCBtZXRob2QgYnkgZGVmYXVsdC4gXG5cdCAqICAgICAgICBJZ25vcmVkIGlmIG51bGwgb3IgdW5kZWZpbmVkLlxuXHQgKiBAcmV0dXJucyBBIHNjcm9sbGVyIG9iamVjdCwgc2ltaWxhciB0byBgemVuc2Nyb2xsYCBidXQgY29udHJvbGxpbmcgdGhlIHByb3ZpZGVkIGVsZW1lbnQuXG5cdCAqL1xuXHR6ZW5zY3JvbGwuY3JlYXRlU2Nyb2xsZXIgPSBmdW5jdGlvbiAoc2Nyb2xsQ29udGFpbmVyLCBkZWZhdWx0RHVyYXRpb24sIGVkZ2VPZmZzZXQpIHtcblx0XHRyZXR1cm4gbWFrZVNjcm9sbGVyKHtcblx0XHRcdGJvZHk6IHNjcm9sbENvbnRhaW5lcixcblx0XHRcdHRvWTogZnVuY3Rpb24gKHkpIHsgc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCA9IHkgfSxcblx0XHRcdGdldFk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AgfSxcblx0XHRcdGdldEhlaWdodDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWF0aC5taW4oc2Nyb2xsQ29udGFpbmVyLmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY0VsZW0uY2xpZW50SGVpZ2h0KSB9LFxuXHRcdFx0Z2V0VG9wT2Y6IGZ1bmN0aW9uIChlbGVtKSB7IHJldHVybiBlbGVtLm9mZnNldFRvcCB9XG5cdFx0fSwgZGVmYXVsdER1cmF0aW9uLCBlZGdlT2Zmc2V0KVxuXHR9XG5cblxuXHQvLyBBdXRvbWF0aWMgbGluay1zbW9vdGhpbmcgb24gYWNob3JzXG5cdC8vIEV4Y2x1ZGUgSUU4LSBvciB3aGVuIG5hdGl2ZSBpcyBlbmFibGVkIG9yIFplbnNjcm9sbCBhdXRvLSBpcyBkaXNhYmxlZFxuXHRpZiAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gd2luZG93ICYmICF3aW5kb3cubm9aZW5zbW9vdGggJiYgIWlzTmF0aXZlU21vb3RoU2Nyb2xsRW5hYmxlZE9uKGRvY3VtZW50LmJvZHkpKSB7XG5cblx0XHR2YXIgaXNIaXN0b3J5U3VwcG9ydGVkID0gXCJoaXN0b3J5XCIgaW4gd2luZG93ICYmIFwicHVzaFN0YXRlXCIgaW4gaGlzdG9yeVxuXHRcdHZhciBpc1Njcm9sbFJlc3RvcmF0aW9uU3VwcG9ydGVkID0gaXNIaXN0b3J5U3VwcG9ydGVkICYmIFwic2Nyb2xsUmVzdG9yYXRpb25cIiBpbiBoaXN0b3J5XG5cblx0XHQvLyBPbiBmaXJzdCBsb2FkICYgcmVmcmVzaCBtYWtlIHN1cmUgdGhlIGJyb3dzZXIgcmVzdG9yZXMgdGhlIHBvc2l0aW9uIGZpcnN0XG5cdFx0aWYgKGlzU2Nyb2xsUmVzdG9yYXRpb25TdXBwb3J0ZWQpIHtcblx0XHRcdGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcImF1dG9cIlxuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGlmIChpc1Njcm9sbFJlc3RvcmF0aW9uU3VwcG9ydGVkKSB7XG5cdFx0XHRcdC8vIFNldCBpdCB0byBtYW51YWxcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcIm1hbnVhbFwiIH0sIDkpXG5cdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50LnN0YXRlICYmIFwiemVuc2Nyb2xsWVwiIGluIGV2ZW50LnN0YXRlKSB7XG5cdFx0XHRcdFx0XHR6ZW5zY3JvbGwudG9ZKGV2ZW50LnN0YXRlLnplbnNjcm9sbFkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCBmYWxzZSlcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGVkZ2Ugb2Zmc2V0IG9uIGZpcnN0IGxvYWQgaWYgbmVjZXNzYXJ5XG5cdFx0XHQvLyBUaGlzIG1heSBub3Qgd29yayBvbiBJRSAob3Igb2xkZXIgY29tcHV0ZXI/KSBhcyBpdCByZXF1aXJlcyBtb3JlIHRpbWVvdXQsIGFyb3VuZCAxMDAgbXNcblx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQvLyBBZGp1c3RtZW50IGlzIG9ubHkgbmVlZGVkIGlmIHRoZXJlIGlzIGFuIGVkZ2Ugb2Zmc2V0OlxuXHRcdFx0XHRcdHZhciBlZGdlT2Zmc2V0ID0gemVuc2Nyb2xsLnNldHVwKCkuZWRnZU9mZnNldFxuXHRcdFx0XHRcdGlmIChlZGdlT2Zmc2V0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGFyZ2V0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiI1wiKVsxXSlcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRFbGVtKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0YXJnZXRZID0gTWF0aC5tYXgoMCwgemVuc2Nyb2xsLmdldFRvcE9mKHRhcmdldEVsZW0pIC0gZWRnZU9mZnNldClcblx0XHRcdFx0XHRcdFx0dmFyIGRpZmYgPSB6ZW5zY3JvbGwuZ2V0WSgpIC0gdGFyZ2V0WVxuXHRcdFx0XHRcdFx0XHQvLyBPbmx5IGRvIHRoZSBhZGp1c3RtZW50IGlmIHRoZSBicm93c2VyIGlzIHZlcnkgY2xvc2UgdG8gdGhlIGVsZW1lbnQ6XG5cdFx0XHRcdFx0XHRcdGlmICgwIDw9IGRpZmYgJiYgZGlmZiA8IDkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDkpXG5cdFx0XHR9XG5cblx0XHR9LCBmYWxzZSlcblxuXHRcdC8vIEhhbmRsaW5nIGNsaWNrcyBvbiBhbmNob3JzXG5cdFx0dmFyIFJFX25vWmVuc21vb3RoID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKW5vWmVuc21vb3RoKFxcXFxzfCQpXCIpXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdHZhciBhbmNob3IgPSBldmVudC50YXJnZXRcblx0XHRcdHdoaWxlIChhbmNob3IgJiYgYW5jaG9yLnRhZ05hbWUgIT09IFwiQVwiKSB7XG5cdFx0XHRcdGFuY2hvciA9IGFuY2hvci5wYXJlbnROb2RlXG5cdFx0XHR9XG5cdFx0XHQvLyBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIHRoZSBjbGljayBpZiBpdCB3YXNuJ3Qgd2l0aCB0aGUgcHJpbWFyeSBidXR0b24sIG9yIHdpdGggc29tZSBtb2RpZmllciBrZXlzOlxuXHRcdFx0aWYgKCFhbmNob3IgfHwgZXZlbnQud2hpY2ggIT09IDEgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdC8vIFNhdmUgdGhlIGN1cnJlbnQgc2Nyb2xsaW5nIHBvc2l0aW9uIHNvIGl0IGNhbiBiZSB1c2VkIGZvciBzY3JvbGwgcmVzdG9yYXRpb246XG5cdFx0XHRpZiAoaXNTY3JvbGxSZXN0b3JhdGlvblN1cHBvcnRlZCkge1xuXHRcdFx0XHR2YXIgaGlzdG9yeVN0YXRlID0gaGlzdG9yeS5zdGF0ZSAmJiB0eXBlb2YgaGlzdG9yeS5zdGF0ZSA9PT0gXCJvYmplY3RcIiA/IGhpc3Rvcnkuc3RhdGUgOiB7fVxuXHRcdFx0XHRoaXN0b3J5U3RhdGUuemVuc2Nyb2xsWSA9IHplbnNjcm9sbC5nZXRZKClcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRoaXN0b3J5LnJlcGxhY2VTdGF0ZShoaXN0b3J5U3RhdGUsIFwiXCIpXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHQvLyBBdm9pZCB0aGUgQ2hyb21lIFNlY3VyaXR5IGV4Y2VwdGlvbiBvbiBmaWxlIHByb3RvY29sLCBlLmcuLCBmaWxlOi8vaW5kZXguaHRtbFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBGaW5kIHRoZSByZWZlcmVuY2VkIElEOlxuXHRcdFx0dmFyIGhyZWYgPSBhbmNob3IuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSB8fCBcIlwiXG5cdFx0XHRpZiAoaHJlZi5pbmRleE9mKFwiI1wiKSA9PT0gMCAmJiAhUkVfbm9aZW5zbW9vdGgudGVzdChhbmNob3IuY2xhc3NOYW1lKSkge1xuXHRcdFx0XHR2YXIgdGFyZ2V0WSA9IDBcblx0XHRcdFx0dmFyIHRhcmdldEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChocmVmLnN1YnN0cmluZygxKSlcblx0XHRcdFx0aWYgKGhyZWYgIT09IFwiI1wiKSB7XG5cdFx0XHRcdFx0aWYgKCF0YXJnZXRFbGVtKSB7XG5cdFx0XHRcdFx0XHQvLyBMZXQgdGhlIGJyb3dzZXIgaGFuZGxlIHRoZSBjbGljayBpZiB0aGUgdGFyZ2V0IElEIGlzIG5vdCBmb3VuZC5cblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0YXJnZXRZID0gemVuc2Nyb2xsLmdldFRvcE9mKHRhcmdldEVsZW0pXG5cdFx0XHRcdH1cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHQvLyBCeSBkZWZhdWx0IHRyaWdnZXIgdGhlIGJyb3dzZXIncyBgaGFzaGNoYW5nZWAgZXZlbnQuLi5cblx0XHRcdFx0dmFyIG9uRG9uZSA9IGZ1bmN0aW9uICgpIHsgd2luZG93LmxvY2F0aW9uID0gaHJlZiB9XG5cdFx0XHRcdC8vIC4uLnVubGVzcyB0aGVyZSBpcyBhbiBlZGdlIG9mZnNldCBzcGVjaWZpZWRcblx0XHRcdFx0dmFyIGVkZ2VPZmZzZXQgPSB6ZW5zY3JvbGwuc2V0dXAoKS5lZGdlT2Zmc2V0XG5cdFx0XHRcdGlmIChlZGdlT2Zmc2V0KSB7XG5cdFx0XHRcdFx0dGFyZ2V0WSA9IE1hdGgubWF4KDAsIHRhcmdldFkgLSBlZGdlT2Zmc2V0KVxuXHRcdFx0XHRcdGlmIChpc0hpc3RvcnlTdXBwb3J0ZWQpIHtcblx0XHRcdFx0XHRcdG9uRG9uZSA9IGZ1bmN0aW9uICgpIHsgaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIGhyZWYpIH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0emVuc2Nyb2xsLnRvWSh0YXJnZXRZLCBudWxsLCBvbkRvbmUpXG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpXG5cblx0fVxuXG5cblx0cmV0dXJuIHplbnNjcm9sbFxuXG5cbn0pKTtcbiIsImltcG9ydCB7XHJcbiAgZ3VpZGVSZWFjdHNcclxufSBmcm9tICcuL2FzaWRlLmpzJ1xyXG5pbXBvcnQge1xyXG4gIGluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0xhc3RCdG5PZkFjY2VwdGFuY2VcclxufSBmcm9tICcuL2F0dHJ5YnMuanMnO1xyXG5pbXBvcnQgemVuc2Nyb2xsIGZyb20gJy4vLi4vLi4vbm9kZV9tb2R1bGVzL3plbnNjcm9sbC96ZW5zY3JvbGwuanMnXHJcbid1c2Ugc3RyaWN0J1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZUJ0bnNPZkFjY2VwdGFuY2UpXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplQnRuc09mQWNjZXB0YW5jZSgpIHtcclxuICBsZXQgYWNjZXB0YXRpb25CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0bicpXHJcbiAgbGV0IGFtb3VudCA9IGFjY2VwdGF0aW9uQnRuLmxlbmd0aFxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50OyBpKyspIHtcclxuICAgIGFjY2VwdGF0aW9uQnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoYWNjZXB0YXRpb25CdG5baV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdiZWZvcmVJdElzQ2xpY2tlZCcpID09PSB0cnVlKSB7XHJcbiAgICAgICAgYWNjZXB0YXRpb25CdG5baV0uY2xhc3NMaXN0LnJlbW92ZSgnYmVmb3JlSXRJc0NsaWNrZWQnKVxyXG4gICAgICAgIGFjY2VwdGF0aW9uQnRuW2ldLmNsYXNzTGlzdC5hZGQoJ2l0SXNDbGlja2VkJylcclxuICAgICAgICBzaWduVGhpc0FzQ2xpY2tlZChhY2NlcHRhdGlvbkJ0bltpXSlcclxuICAgICAgICBpbml0aWFsaXplTmV4dFNlY3Rpb24oaSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0QWdhaW5HdWlkZVRleHRGb3JUaGlzU2VjdGlvbihpKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2lnblRoaXNBc0NsaWNrZWQoYnRuKSB7XHJcbiAgYnRuLmlubmVyVGV4dCA9ICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0QWdhaW5HdWlkZVRleHRGb3JUaGlzU2VjdGlvbihpKSB7XHJcbiAgZ3VpZGVSZWFjdHMoaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVOZXh0U2VjdGlvbihpdGVyYXRvcikge1xyXG4gIGxldCBhbGxPcm5hbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcuY29ycHVzX3NlY3Rpb25fZm9ybV9vcm5hbWVudC1tYXJrZXInKVxyXG4gIGxldCB0aGlzT3JuYW1lbnQgPSBhbGxPcm5hbWVudHNbaXRlcmF0b3JdO1xyXG4gIGxldCBuZXh0T3JuYW1lbnQgPSBhbGxPcm5hbWVudHNbaXRlcmF0b3IgKyAxXTtcclxuICBpZiAoaXRlcmF0b3IgPT09IDEgfHwgaXRlcmF0b3IgPT09IDIpIHtcclxuICAgIHRoaXNPcm5hbWVudCA9IGFsbE9ybmFtZW50c1swXTtcclxuICAgIG5leHRPcm5hbWVudCA9IGFsbE9ybmFtZW50c1sxXTtcclxuICB9IGVsc2UgaWYgKGl0ZXJhdG9yID49IDMgJiYgaXRlcmF0b3IgIT09IDUpIHtcclxuICAgIHRoaXNPcm5hbWVudCA9IGFsbE9ybmFtZW50c1tpdGVyYXRvciAtIDJdO1xyXG4gICAgbmV4dE9ybmFtZW50ID0gYWxsT3JuYW1lbnRzW2l0ZXJhdG9yIC0gMV07XHJcbiAgfSBlbHNlIGlmIChpdGVyYXRvciA+PSA0KSB7XHJcbiAgICB0aGlzT3JuYW1lbnQgPSBhbGxPcm5hbWVudHNbaXRlcmF0b3IgLSAzXTtcclxuICAgIG5leHRPcm5hbWVudCA9IGFsbE9ybmFtZW50c1tpdGVyYXRvciAtIDJdO1xyXG4gIH1cclxuICBpZiAoaXRlcmF0b3IgIT09IDYpIHtcclxuICAgIHRoaXNPcm5hbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ljb25zL3BvbGUuMi5zdmcnKTtcclxuICAgIHRoaXNPcm5hbWVudC5jbGFzc0xpc3QuYWRkKCdpdElzUGFzc2VkVGhyb3VnaHQnKTtcclxuICAgIG5leHRPcm5hbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpdElzSGlkZGVuJyk7XHJcbiAgICAvLyB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV4dE9ybmFtZW50Lm9mZnNldFRvcClcclxuICAgIHplbnNjcm9sbC50b1kodGhpc09ybmFtZW50Lm9mZnNldFRvcCk7XHJcbiAgfVxyXG4gIGVuYWJsZU5leHRTZWN0aW9uKGl0ZXJhdG9yKTtcclxuICBpZiAoaXRlcmF0b3IgPT09IDEpIHtcclxuICAgIGxldCBQb3NpdGlvbkEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHMgZmllbGRzZXQnKVsxXTtcclxuICAgIHplbnNjcm9sbC50b1koUG9zaXRpb25BLm9mZnNldFRvcCk7XHJcbiAgfSBlbHNlIGlmIChpdGVyYXRvciA9PT0gMikge1xyXG4gICAgbGV0IFBvc2l0aW9uQiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkcyBmaWVsZHNldCcpWzJdO1xyXG4gICAgemVuc2Nyb2xsLnRvWShQb3NpdGlvbkIub2Zmc2V0VG9wKTtcclxuICB9IGVsc2UgaWYgKGl0ZXJhdG9yID09PSA1KSB7XHJcbiAgICBsZXQgUG9zaXRpb25DID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzLTIgZmllbGRzZXQnKVsxXTtcclxuICAgIHplbnNjcm9sbC50b1koUG9zaXRpb25DLm9mZnNldFRvcCk7XHJcbiAgICBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX3Nob3dMYXN0QnRuT2ZBY2NlcHRhbmNlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBlbmFibGVOZXh0U2VjdGlvbihpdGVyYXRvcikge1xyXG4gIGl0ZXJhdG9yICs9IDFcclxuICBndWlkZVJlYWN0cyhpdGVyYXRvcik7XHJcbiAgXHJcbiAgICBsZXQgYWxsU2VjdGlvbnMgPSBbXHJcbiAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzJyksXHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkcyBmaWVsZHNldCcpWzFdLFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHMgZmllbGRzZXQnKVsyXSxcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQycpLFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHMtMicpLFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHMtMiBmaWVsZHNldCcpWzFdLFxyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHMtMiBmaWVsZHNldCcpWzFdXHJcbiAgICBdXHJcbiAgICBhbGxTZWN0aW9uc1tpdGVyYXRvcl0uY2xhc3NMaXN0LnJlbW92ZSgnaXRJc0hpZGRlbicpO1xyXG4gICAgaWYgKGl0ZXJhdG9yID09PSAzKSB7XHJcbiAgICAgIGFsbFNlY3Rpb25zW2l0ZXJhdG9yXS5xdWVyeVNlbGVjdG9yKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNfZmllbGRzZXQtYl9jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdzdHJpa2VOYW1lJyk7XHJcbiAgICB9XHJcbiAgXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dCdG5PZkFjY2VwdGFuY2UoYnRuLCBjb250YWluZXIpIHtcclxuICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXRJc0hpZGRlbicpO1xyXG4gIGJ0bi5jbGFzc0xpc3QuYWRkKCdiZWZvcmVJdElzQ2xpY2tlZCcpO1xyXG59IiwiaW1wb3J0IHtcclxuICAgIHNob3dCdG5PZkFjY2VwdGFuY2VcclxufSBmcm9tICcuL2Zvcm1faW5pdGlhbGl6ZU5leHRTZWN0aW9uJztcclxuJ3VzZSBzdHJpY3QnO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdGlhbGl6ZVVzZXJGbG93VmlhU2VjdGlvbk9mRGVzY3JpcHRpb25zKTtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVVc2VyRmxvd1ZpYVNlY3Rpb25PZkRlc2NyaXB0aW9ucygpIHtcclxuICAgIGxldCBzdHJpa2VOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hendhdWRlcnplbmlhXCJdJyk7XHJcbiAgICBzdHJpa2VOYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaG93RGVzY3JpcHRpb24oKTtcclxuICAgICAgICBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX3Nob3dCdG5PZkFjY2VwdGFuY2UoKTtcclxuICAgICAgICBpZiAoc3RyaWtlTmFtZS52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHVzZVRoaXNWYWx1ZVRvQ3JlYXRlRGVzY3JpcHRpb24oc3RyaWtlTmFtZS52YWx1ZSArICcgdG8nLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9uKCdHZHkganXFvCB3cGlzemVzeiBuYXp3xJkgdGVnbyB1ZGVyemVuaWEsIHRvIHphc8WCeW5pZSBvbm8gamFrbycsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9uKHN0cmluZywgaW50ZWdlcikge1xyXG4gICAgbGV0IHNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncC4tLWRlcyBzcGFuJyk7XHJcbiAgICBzcGFuc1tpbnRlZ2VyXS5pbm5lclRleHQgPSBzdHJpbmc7XHJcbn1cclxubGV0IG9ubHlPbmNlID0gMFxyXG5cclxuZnVuY3Rpb24gc2hvd0Rlc2NyaXB0aW9uKCkge1xyXG4gICAgb25seU9uY2UrK1xyXG4gICAgaWYgKG9ubHlPbmNlID09PSAxKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLi0tZGVzJyk7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpdHNIaWRkZW4nKTtcclxuICAgIH1cclxufVxyXG5sZXQgY29udHJvbGxlciA9IDA7XHJcblxyXG5mdW5jdGlvbiBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX3Nob3dCdG5PZkFjY2VwdGFuY2UoKSB7XHJcbiAgICBpZiAoY29udHJvbGxlciA9PT0gMCkge1xyXG4gICAgICAgIGxldCBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lci5mb3VydGhTZWN0aW9uQnRuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBidG5PZlRoaXNTZWN0aW9uID0gYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0blwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzaG93QnRuT2ZBY2NlcHRhbmNlKGJ0bk9mVGhpc1NlY3Rpb24sIGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uKTtcclxuICAgICAgICBjb250cm9sbGVyID0gMTtcclxuICAgIH1cclxufVxyXG4vKlxyXG5mdW5jdGlvbiBzZXRTdHJpa2VOYW1lT250b0Rlc2NyaXB0aW9uKGkpIHtcclxuICAgIGxldCBpbnAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmF6d2F1ZGVyemVuaWFcIl0nKVxyXG4gICAgaW5wLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzdHJOYW1lID0gaW5wLnZhbHVlO1xyXG4gICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLi0tZGVzX25hendhLWNpb3N1Jyk7XHJcbiAgICAgICAgaXRlbS5pbm5lclRleHQgPSBzdHJOYW1lICsgJyB0byBsZWdlbmRhcm5lJztcclxuICAgICAgICBzaG93QWxsRGVzKCk7XHJcbiAgICB9KVxyXG4gICAgaW5wLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaXRtID0gaW5wLnZhbHVlXHJcbiAgICAgICAgaWYgKGl0bS50cmltKCkgIT09ICcnICYmIHNldE5leHRQYXJ0T2ZGb3JtdWxhRm9yVGhlRmlyc3RUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHJOYW1lID0gaW5wLnZhbHVlXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLi0tZGVzX25hendhLWNpb3N1JylcclxuICAgICAgICAgICAgaXRlbS5pbm5lclRleHQgPSBzdHJOYW1lICsgJyB0byBsZWdlbmRhcm5lJ1xyXG4gICAgICAgICAgICBzaG93QWxsRGVzKCk7XHJcbiAgICAgICAgICAgIHNldE5leHRQYXJ0T2ZGb3JtdWxhKCk7XHJcbiAgICAgICAgICAgIHNldE5leHRQYXJ0T2ZGb3JtdWxhRm9yVGhlRmlyc3RUaW1lID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59Ki8iLCJpbXBvcnQge1xyXG4gIHNob3dCdG5PZkFjY2VwdGFuY2VcclxufSBmcm9tICcuL2Zvcm1faW5pdGlhbGl6ZU5leHRTZWN0aW9uLmpzJztcclxuLyppbXBvcnQge1xyXG4gIHNldE5hbWVUb0Rlc1xyXG59IGZyb20gJy4vYXRha2ktc2V0LXR4dC5qcyc7XHJcbmltcG9ydCB7XHJcbiAgc2V0Tmlja25hbWVUb0Rlc1xyXG59IGZyb20gJy4vYXRha2ktc2V0LXR4dC5qcyc7XHJcbmltcG9ydCB7XHJcbiAgc2V0U2VudGVuY2VUb0Rlc1xyXG59IGZyb20gJy4vYXRha2ktc2V0LXR4dC5qcyc7Ki9cclxuaW1wb3J0IHt1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9ufSBmcm9tICcuL2Zvcm1fc2VjdGlvbi1mb3VydGguanMnO1xyXG4ndXNlIHN0cmljdCc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgaW5pdFVzZXJGbG93VmlhU2VjdGlvbl9zZWxlY3ROb2Rlc1RvVGhpc1Byb2Nlc3MoKVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluaXRVc2VyRmxvd1ZpYVNlY3Rpb25fc2VsZWN0Tm9kZXNUb1RoaXNQcm9jZXNzKCkge1xyXG4gIGxldCBub2RlcyA9IFtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpbWllXCJdJyksXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicHJ6eWRvbWVrXCJdJyksXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiemF3b2xhbmllXCJdJylcclxuICBdXHJcbiAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaWR4KSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBsZXQgc2VjdGlvbkNvbXBsZXRlZCA9IGluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fY2hlY2tJZlRoaXNTZWN0aW9uSXNDb21wbGV0ZWQobm9kZXMpXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgc2VjdGlvbkNvbXBsZXRlZCAhPT0gdHJ1ZSkge1xyXG4gICAgICBpbml0VXNlckZsb3dWaWFTZWN0aW9uX2dvVG9OZXh0Tm9kZShub2RlLCBpZHgsIG5vZGVzKVxyXG4gICAgfSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAxMyAmJiBzZWN0aW9uQ29tcGxldGVkID09PSB0cnVlKSB7XHJcbiAgICAgIG5vZGUuYmx1cigpXHJcbiAgICAgIGluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0J0bk9mQWNjZXB0YW5jZSgpXHJcbiAgICB9XHJcbiAgfSkpXHJcbiAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaWR4KSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgbGV0IHNlY3Rpb25Db21wbGV0ZWQgPSBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX2NoZWNrSWZUaGlzU2VjdGlvbklzQ29tcGxldGVkKG5vZGVzKVxyXG4gICAgaWYgKHNlY3Rpb25Db21wbGV0ZWQgPT09IHRydWUpIHtcclxuICAgICAgaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKClcclxuICAgIH07XHJcbiAgICBpZiAoaWR4PT09MHx8aWR4PT09MSl7XHJcbiAgICAgIGlmKGlkeD09PTApe1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBub2RlLnZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbm9kZS52YWx1ZS5zbGljZSgxKTtcclxuICAgICAgICB1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9uKHN0cmluZywgMyk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBub2RlLnZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbm9kZS52YWx1ZS5zbGljZSgxKTtcclxuICAgICAgICB1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9uKHN0cmluZywgNCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VmlhU2VjdGlvbl9nb1RvTmV4dE5vZGUobm9kZSwgaWR4LCBub2Rlcykge1xyXG4gIG5vZGUuYmx1cigpXHJcbiAgaWYgKGlkeCA8IDIpIHtcclxuICAgIG5vZGVzW2lkeCArIDFdLmZvY3VzKClcclxuICB9IGVsc2UgaWYgKGlkeCA9PT0gMikge1xyXG4gICAgbm9kZXNbMF0uZm9jdXMoKVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9jaGVja0lmVGhpc1NlY3Rpb25Jc0NvbXBsZXRlZChub2Rlcykge1xyXG4gIGxldCBhcnIgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZV1cclxuICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpZHgpIHtcclxuICAgIGlmIChub2RlLnZhbHVlLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgYXJyW2lkeF0gPSBmYWxzZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXJyW2lkeF0gPSB0cnVlXHJcbiAgICB9XHJcbiAgfSlcclxuICBpZiAoYXJyLmluZGV4T2YoZmFsc2UpID09PSAtMSkge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcbmxldCBjb250cm9sbGVyID0gMDtcclxuXHJcbmZ1bmN0aW9uIGluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0J0bk9mQWNjZXB0YW5jZSgpIHtcclxuICBpZiAoY29udHJvbGxlciA9PT0gMCkge1xyXG4gICAgbGV0IGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lci5maXJzdFNlY3Rpb25CdG4nKVxyXG4gICAgbGV0IGJ0bk9mVGhpc1NlY3Rpb24gPSBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0bicpXHJcbiAgICBzaG93QnRuT2ZBY2NlcHRhbmNlKGJ0bk9mVGhpc1NlY3Rpb24sIGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uKVxyXG4gICAgLy9zZXRDdXJyZW50RGF0YVRvQXZhdGFyRGVzY3JpcHRpb24oKTtcclxuICAgIGNvbnRyb2xsZXIgPSAxO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudERhdGFUb0F2YXRhckRlc2NyaXB0aW9uKCkge1xyXG4gIHNldE5hbWVUb0RlcygpXHJcbiAgc2V0Tmlja25hbWVUb0RlcygpXHJcbiAgc2V0U2VudGVuY2VUb0RlcygpXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RUb0FycmF5KG9iamVjdCkge1xyXG4gICAgbGV0IGFtb3VudCA9IG9iamVjdC5sZW5ndGg7XHJcbiAgICBsZXQgYXJyYXkgPVtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8YW1vdW50OyBpKyspe1xyXG4gICAgICAgIGFycmF5LnB1c2gob2JqZWN0W2ldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJheTtcclxufSIsIlwidXNlIHN0cmljdFwiO1xyXG5pbXBvcnQgaXRlcmF0b3JPZlBvaW50c0xlZnQgZnJvbSBcIi4vYXNpZGUuanNcIjtcclxuaW1wb3J0IHtcclxuICBzaG93QnRuT2ZBY2NlcHRhbmNlXHJcbn0gZnJvbSBcIi4vZm9ybV9pbml0aWFsaXplTmV4dFNlY3Rpb24uanNcIjtcclxuaW1wb3J0IHtcclxuICBvYmplY3RUb0FycmF5XHJcbn0gZnJvbSBcIi4vb2JqZWN0LXRvLWFycmF5LmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgdXNlVGhpc1ZhbHVlVG9DcmVhdGVEZXNjcmlwdGlvblxyXG59IGZyb20gJy4vZm9ybV9zZWN0aW9uLWZvdXJ0aC5qcyc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRpYWxpemVBdHRhY2tzUGFydCk7XHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVBdHRhY2tzKGkpIHtcclxuICBsZXQgYXR0YWNrcyA9IG9iamVjdFRvQXJyYXkoXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc19maWVsZHNldC1iX2NvbnRhaW5lcl9zZWxlY3QtY29udGFpbmVyXCJcclxuICAgIClcclxuICApO1xyXG4gIGF0dGFja3MuZm9yRWFjaChmdW5jdGlvbiAoYXR0YWNrLCBpZHgpIHtcclxuICAgIGF0dGFjay5jbGFzc0xpc3QucmVtb3ZlKFwiZW5hYmxlZFwiKTtcclxuICAgIGxldCBvcHRpb25zID0gb2JqZWN0VG9BcnJheShhdHRhY2sucXVlcnlTZWxlY3RvckFsbChcIm9wdGlvblwiKSk7XHJcbiAgICBhdHRhY2sucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgc3luY2hyb25pemVCYWNrZ3JvdW5kc09uQ2hhbmdlKGF0dGFjaywgb3B0aW9ucyk7XHJcbiAgICAgIHNlbmRMaXN0VmFsdWVUb0Z1bmN0aW9uVGhhdFNlbmRzSXRGdXJ0aGVyKGF0dGFjay5xdWVyeVNlbGVjdG9yKFwic2VsZWN0XCIpLnZhbHVlLCAxKTtcclxuICAgICAgc2VuZElNR2xpc3RUb0Z1bmN0aW9uVGhhdFNlbmRzSXRGdXJ0aGVyKGF0dGFjaywgb3B0aW9ucyk7XHJcbiAgICAgIHNlbmRQb3dlcnNUb0Z1bmN0aW9uVGhhdFNlbnNJdEZ1cnRoZXIoYXR0YWNrLCBvcHRpb25zKTtcclxuICAgIH0pO1xyXG4gICAgYXR0YWNrLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzeW5jaHJvbml6ZUJhY2tncm91bmRzT25CbHVyKFxyXG4gICAgICAgIGF0dGFjayxcclxuICAgICAgICBhdHRhY2sucXVlcnlTZWxlY3RvcihcInNlbGVjdFwiKSxcclxuICAgICAgICBvcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uKSB7XHJcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBvYmplY3RUb0FycmF5KFxyXG4gICAgICBhdHRhY2sucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc19maWVsZHNldC1iX2NvbnRhaW5lcl9zZWxlY3QtY29udGFpbmVyX2ltZy1wYXJ0LWNvbnRhaW5lcl9vcHRcIlxyXG4gICAgICApXHJcbiAgICApLmZvckVhY2goZnVuY3Rpb24gKGJlbHQpIHtcclxuICAgICAgYmVsdC5jbGFzc0xpc3QucmVtb3ZlKFwiSlNvbkJsdXJcIiwgXCJKU29uU2VsZWN0XCIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgYXR0YWNrc1tpXS5jbGFzc0xpc3QuYWRkKFwiZW5hYmxlZFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3luY2hyb25pemVCYWNrZ3JvdW5kc09uQ2hhbmdlKG5vZGUsIGNoaWxkcmVuKSB7XHJcbiAgbGV0IGJlbHRzID0gb2JqZWN0VG9BcnJheShcclxuICAgIG5vZGUucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNfZmllbGRzZXQtYl9jb250YWluZXJfc2VsZWN0LWNvbnRhaW5lcl9pbWctcGFydC1jb250YWluZXJfb3B0XCJcclxuICAgIClcclxuICApO1xyXG4gIGJlbHRzLmZvckVhY2goYmVsdCA9PiBiZWx0LmNsYXNzTGlzdC5yZW1vdmUoXCJKU29uU2VsZWN0XCIsIFwiSlNvbkJsdXJcIikpO1xyXG4gIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG9wdCwgaWR4KSB7XHJcbiAgICBpZiAob3B0LnZhbHVlID09PSBub2RlLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIikudmFsdWUpIHtcclxuICAgICAgYmVsdHNbaWR4XS5jbGFzc0xpc3QuYWRkKFwiSlNvblNlbGVjdFwiKTtcclxuICAgICAgaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKCk7XHJcbiAgICAgIGl0ZXJhdG9yT2ZQb2ludHNMZWZ0Lml0ZXJhdG9yKG5vZGUsIGlkeCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN5bmNocm9uaXplQmFja2dyb3VuZHNPbkJsdXIobm9kZSwgbGlzdCwgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAob3B0aW9uLCBpZHgpIHtcclxuICAgIGlmIChvcHRpb24udmFsdWUgPT09IGxpc3QudmFsdWUpIHtcclxuICAgICAgbm9kZVxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNfZmllbGRzZXQtYl9jb250YWluZXJfc2VsZWN0LWNvbnRhaW5lcl9pbWctcGFydC1jb250YWluZXJfb3B0XCJcclxuICAgICAgICApW2lkeF0uY2xhc3NMaXN0LmFkZChcIkpTb25CbHVyXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5sZXQgY29udHJvbGxlciA9IDA7XHJcblxyXG5mdW5jdGlvbiBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX3Nob3dCdG5PZkFjY2VwdGFuY2UoKSB7XHJcbiAgaWYgKGNvbnRyb2xsZXIgPT09IDApIHtcclxuICAgIGxldCBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lci50aGlyZFNlY3Rpb25CdG5cIlxyXG4gICAgKTtcclxuICAgIGxldCBidG5PZlRoaXNTZWN0aW9uID0gYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0blwiXHJcbiAgICApO1xyXG4gICAgc2hvd0J0bk9mQWNjZXB0YW5jZShidG5PZlRoaXNTZWN0aW9uLCBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbik7XHJcbiAgICBjb250cm9sbGVyID0gMTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVBdHRhY2tzUGFydCgpIHtcclxuICBvYmplY3RUb0FycmF5KFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNfZmllbGRzZXQtYl9jb250YWluZXJfc2VsZWN0LWNvbnRhaW5lclwiXHJcbiAgICApXHJcbiAgKS5mb3JFYWNoKGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuICAgIC8vb24gc2VsZWN0LWxpc3Qgb3B0aW9uIG1vdXNlIGhvdmVyIG92ZXJcclxuICAgIG9iamVjdFRvQXJyYXkoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIikpLmZvckVhY2goZnVuY3Rpb24gKFxyXG4gICAgICBvcHRpb24sXHJcbiAgICAgIGlkeFxyXG4gICAgKSB7XHJcbiAgICAgIG9wdGlvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaGlnaGxpZ2h0QmFja2dyb3VuZChjb250YWluZXIsIGV2ZW50LCBpZHgpO1xyXG4gICAgICB9KTtcclxuICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaGlnaGxpZ2h0QmFja2dyb3VuZChjb250YWluZXIsIGV2ZW50LCBpZHgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy9vcHRpb24tbGlrZSBkaXZcclxuICAgIG9iamVjdFRvQXJyYXkoXHJcbiAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzX2ZpZWxkc2V0LWJfY29udGFpbmVyX3NlbGVjdC1jb250YWluZXJfaW1nLXBhcnQtY29udGFpbmVyX29wdFwiXHJcbiAgICAgIClcclxuICAgICkuZm9yRWFjaChmdW5jdGlvbiAoYmVsdCwgaWR4KSB7XHJcbiAgICAgIGJlbHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBoaWdobGlnaHRCYWNrZ3JvdW5kKGNvbnRhaW5lciwgZXZlbnQsIGlkeCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBiZWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBoaWdobGlnaHRCYWNrZ3JvdW5kKGNvbnRhaW5lciwgZXZlbnQsIGlkeCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBiZWx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgY2hhbmdlRXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKVxyXG4gICAgICAgIGNoYW5nZUV2LmluaXRFdmVudCgnY2hhbmdlJyk7XHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIilbaWR4XS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3RcIikuZGlzcGF0Y2hFdmVudChjaGFuZ2VFdik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZ2hsaWdodEJhY2tncm91bmQoY29udGFpbmVyLCBldmVudCwgaWR4KSB7XHJcbiAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2VvdmVyXCIpIHtcclxuICAgIGNvbnRhaW5lclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc19maWVsZHNldC1iX2NvbnRhaW5lcl9zZWxlY3QtY29udGFpbmVyX2ltZy1wYXJ0LWNvbnRhaW5lcl9vcHRcIlxyXG4gICAgICApW2lkeF0uY2xhc3NMaXN0LmFkZChcIkpTb25Ib3ZlclwiKTtcclxuICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwib3B0aW9uXCIpW2lkeF0uY2xhc3NMaXN0LmFkZChcIkpTb25Ib3ZlclwiKTtcclxuICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2VvdXRcIikge1xyXG4gICAgY29udGFpbmVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIFwiLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzX2ZpZWxkc2V0LWJfY29udGFpbmVyX3NlbGVjdC1jb250YWluZXJfaW1nLXBhcnQtY29udGFpbmVyX29wdFwiXHJcbiAgICAgIClbaWR4XS5jbGFzc0xpc3QucmVtb3ZlKFwiSlNvbkhvdmVyXCIpO1xyXG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIilbaWR4XS5jbGFzc0xpc3QucmVtb3ZlKFwiSlNvbkhvdmVyXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZExpc3RWYWx1ZVRvRnVuY3Rpb25UaGF0U2VuZHNJdEZ1cnRoZXIoc3RyaW5nLCBpdGVyKSB7XHJcbiAgc3RyaW5nID0gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgdXNlVGhpc1ZhbHVlVG9DcmVhdGVEZXNjcmlwdGlvbihzdHJpbmcsIGl0ZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kSU1HbGlzdFRvRnVuY3Rpb25UaGF0U2VuZHNJdEZ1cnRoZXIoYXR0YWNrLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChvcHQsIGlkeCkge1xyXG4gICAgaWYgKG9wdC52YWx1ZSA9PT0gYXR0YWNrLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLnZhbHVlKSB7XHJcbiAgICAgIHNlbmRJTUcoYXR0YWNrLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc19maWVsZHNldC1iX2NvbnRhaW5lcl9zZWxlY3QtY29udGFpbmVyX2ltZy1wYXJ0LWNvbnRhaW5lcl9vcHQnKVtpZHhdKTtcclxuICAgIH1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kSU1HKGJlbHRPZkltYWdlcykge1xyXG4gIGxldCBpbWFnID0gYmVsdE9mSW1hZ2VzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpWzBdO1xyXG4gIGxldCBhdHRyeWIgPSBpbWFnLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgbGV0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuLS1wbGF0ZV9pbWdfaWNvbicpO1xyXG4gIGljb24uc2V0QXR0cmlidXRlKCdzcmMnLCBhdHRyeWIpO1xyXG4gIGxldCBhbGxJTUdzID0gYmVsdE9mSW1hZ2VzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLmxlbmd0aDtcclxuICBsZXQgc3RhbmRhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuLS1zdGFuZGFydF9pbWdfYmNrZycpO1xyXG4gIHdoaWxlIChzdGFuZGFydC5xdWVyeVNlbGVjdG9yKCdJTUcnKSAhPT0gbnVsbCkge1xyXG4gICAgbGV0IGltYWdlVG9EZWwgPSBzdGFuZGFydC5xdWVyeVNlbGVjdG9yKCdJTUcnKTtcclxuICAgIHN0YW5kYXJ0LnJlbW92ZUNoaWxkKGltYWdlVG9EZWwpO1xyXG4gIH1cclxuICBmb3IgKGxldCBqID0gMDsgaiA8IGFsbElNR3M7IGorKykge1xyXG4gICAgaWYgKGogPiAwKSB7XHJcbiAgICAgIGxldCB0aGVJTUcgPSBiZWx0T2ZJbWFnZXMucXVlcnlTZWxlY3RvckFsbCgnaW1nJylbal07XHJcbiAgICAgIGxldCBzb3VyY2VJTUcgPSB0aGVJTUcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgbGV0IG5ld0lNRyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBuZXdJTUcuc2V0QXR0cmlidXRlKCdzcmMnLCBzb3VyY2VJTUcpO1xyXG4gICAgICBzdGFuZGFydC5hcHBlbmRDaGlsZChuZXdJTUcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFBvd2Vyc1RvRnVuY3Rpb25UaGF0U2Vuc0l0RnVydGhlcihub2RlLCBvcHRzKSB7XHJcbiAgbGV0IGl0ZXJhdG9yO1xyXG4gIG9wdHMuZm9yRWFjaChmdW5jdGlvbiAob3B0LCBpZHgpIHtcclxuICAgIGlmIChvcHQudmFsdWUgPT09IG5vZGUucXVlcnlTZWxlY3Rvcignc2VsZWN0JykudmFsdWUpIHtcclxuICAgICAgaXRlcmF0b3IgPSBpZHg7XHJcbiAgICB9XHJcbiAgfSlcclxuICBsZXQgYmVsdCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChcclxuICAgICcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNfZmllbGRzZXQtYl9jb250YWluZXJfc2VsZWN0LWNvbnRhaW5lcl9pbWctcGFydC1jb250YWluZXJfb3B0J1xyXG4gIClbaXRlcmF0b3JdO1xyXG4gIGxldCBzdHJuZyA9IFtdO1xyXG4gIGxldCBJTUdzID0gb2JqZWN0VG9BcnJheShiZWx0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcclxuICBJTUdzLmZvckVhY2goZnVuY3Rpb24gKElNRywgaWR4KSB7XHJcbiAgICBpZiAoaWR4ICE9PSAwKSB7XHJcbiAgICAgIGxldCBhdHRyeWIgPSBJTUcuZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgaWYgKGF0dHJ5YiA9PT0gJ2ljb25zL2Jyb24tYmFyYmEuc3ZnJykge1xyXG4gICAgICAgIHN0cm5nLnB1c2goJ2RvZGF0a293xIUgbW9jxIUgdWRlcnplbmlvd8SFJylcclxuICAgICAgfSBlbHNlIGlmIChhdHRyeWIgPT09ICdpY29ucy9icm9uLWN6YXIuc3ZnJykge1xyXG4gICAgICAgIHN0cm5nLnB1c2goJ2RvZGF0a293xIUgbW9jxIUgY3phcm5va3NpxJlza8SFJylcclxuICAgICAgfSBlbHNlIGlmIChhdHRyeWIgPT09ICdpY29ucy9icm9uLXN0cnouc3ZnJykge1xyXG4gICAgICAgIHN0cm5nLnB1c2goJ2RvZGF0a293eW0ga3Vuc3p0ZW0gc3RyemVsZWNraW0nKVxyXG4gICAgICB9IGVsc2UgaWYgKGF0dHJ5YiA9PT0gJ2ljb25zL2Jyb24tc3phbC5zdmcnKSB7XHJcbiAgICAgICAgc3RybmcucHVzaCgnZG9kYXRrb3d5bSBzemFsZcWEc3R3ZW0nKVxyXG4gICAgICB9IGVsc2UgaWYgKGF0dHJ5YiA9PT0gJ2ljb25zL2Jyb24temRyYS5zdmcnKSB7XHJcbiAgICAgICAgc3RybmcucHVzaCgnbmllc3BvZHppYW55bSB6ZHJhZGxpd3ltIGNpb3NlbScpXHJcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnliID09PSAnaWNvbnMvenl3LW9naWVuLnN2ZycpIHtcclxuICAgICAgICBzdHJuZy5wdXNoKCfFvHl3aW/FgmVtIG9nbmlhJylcclxuICAgICAgfSBlbHNlIGlmIChhdHRyeWIgPT09ICdpY29ucy96eXctcm96a2xhZC5zdmcnKSB7XHJcbiAgICAgICAgc3RybmcucHVzaCgnxbx5d2lvxYJlbSByb3prxYJhZHUnKVxyXG4gICAgICB9IGVsc2UgaWYgKGF0dHJ5YiA9PT0gJ2ljb25zL3p5dy13b2Quc3ZnJykge1xyXG4gICAgICAgIHN0cm5nLnB1c2goJ8W8eXdpb8WCZW0gd29keScpXHJcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnliID09PSAnaWNvbnMvenl3LXptaWFuYS5zdmcnKSB7XHJcbiAgICAgICAgc3RybmcucHVzaCgnxbx5d2lvxYJlbSB6bWlhbnknKVxyXG4gICAgICB9IGVsc2UgaWYgKGF0dHJ5YiA9PT0gJ2ljb25zL3p5dy16eXdpYS5zdmcnKSB7XHJcbiAgICAgICAgc3RybmcucHVzaCgnxbx5d2lvxYJlbSDFvHl3aWknKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0cm5nLnB1c2goJ3fFgmFzbsSFIG3EhWRyb8WbY2nEhSDFvHl3aW/FgsOzdyBpIHRhbGVudMOzdycpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBzdHJuZyA9IHN0cm5nLmpvaW4oJywgJylcclxuICB1c2VUaGlzVmFsdWVUb0NyZWF0ZURlc2NyaXB0aW9uKHN0cm5nICsgJy4nLCA2KTtcclxufSIsImltcG9ydCB7XHJcbiAgICBzaG93QnRuT2ZBY2NlcHRhbmNlXHJcbn0gZnJvbSAnLi9mb3JtX2luaXRpYWxpemVOZXh0U2VjdGlvbi5qcyc7XHJcbmltcG9ydCB7XHJcbiAgICBvYmplY3RUb0FycmF5XHJcbn0gZnJvbSAnLi9vYmplY3QtdG8tYXJyYXkuanMnO1xyXG5pbXBvcnQge1xyXG4gICAgZW5hYmxlQXR0YWNrc1xyXG59IGZyb20gJy4vZm9ybV9zZWN0aW9uLXRocmVlLmpzJztcclxuaW1wb3J0IHtcclxuICAgIHVzZVRoaXNWYWx1ZVRvQ3JlYXRlRGVzY3JpcHRpb25cclxufSBmcm9tICcuL2Zvcm1fc2VjdGlvbi1mb3VydGguanMnO1xyXG4ndXNlIHN0cmljdCc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpbml0VXNlckZsb3dWaWFTZWN0aW9uX3NlbGVjdE5vZGVzVG9UaGlzUHJvY2VzcygpO1xyXG59KVxyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VmlhU2VjdGlvbl9zZWxlY3ROb2Rlc1RvVGhpc1Byb2Nlc3MoKSB7XHJcbiAgICBsZXQgYXZhdGFyT2JqZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc19maWVsZHNldC1iX2NvbnRhaW5lcl9yYWRpby1sYWItY29udGFpbmVyJyk7XHJcbiAgICBsZXQgYXZhdGFycyA9IG9iamVjdFRvQXJyYXkoYXZhdGFyT2JqZWN0cyk7XHJcbiAgICBhdmF0YXJzLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhdmF0YXJJc0NsaWNrZWQoaXRlbSwgYXZhdGFycywgaWR4KTtcclxuICAgICAgICBzZW5kQXZhdGFyc1ZhbHVlVG9GdW5jdGlvblRoYXRTZW5kSXRGdXJ0aGVyKGl0ZW0udmFsdWUsIGlkeCk7XHJcbiAgICB9KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF2YXRhcklzQ2xpY2tlZChhdmF0YXIsIGF2YXRhcnMsIGlkeCkge1xyXG4gICAgYXZhdGFycy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpc0NsaWNrZWQnKSk7XHJcbiAgICBsZXQgYXYgPSBhdmF0YXIucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcclxuICAgIGF2LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgYXZhdGFyLmNsYXNzTGlzdC5hZGQoJ2lzQ2xpY2tlZCcpO1xyXG4gICAgaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKGlkeCk7XHJcbn1cclxubGV0IGNvbnRyb2xsZXIgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKGlkeCkge1xyXG4gICAgZW5hYmxlQXR0YWNrcyhpZHgpO1xyXG4gICAgaWYgKGNvbnRyb2xsZXIgPT09IDApIHtcclxuICAgICAgICBsZXQgYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyLnNlY29uZFNlY3Rpb25CdG4nKVxyXG4gICAgICAgIGxldCBidG5PZlRoaXNTZWN0aW9uID0gYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lcl9idG4nKVxyXG4gICAgICAgIHNob3dCdG5PZkFjY2VwdGFuY2UoYnRuT2ZUaGlzU2VjdGlvbiwgYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24pXHJcbiAgICAgICAgY29udHJvbGxlciA9IDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRBdmF0YXJzVmFsdWVUb0Z1bmN0aW9uVGhhdFNlbmRJdEZ1cnRoZXIoaXRlbSwgaWR4KSB7XHJcbiAgICBsZXQgc3RyaW5nO1xyXG4gICAgaWYgKGlkeCA9PT0gMCkge1xyXG4gICAgICAgIHN0cmluZyA9ICd1ZGVyemVuaWUgY2nEmcW8a8SFIGJyb25pxIUgYmlhxYLEhSAtIGN6eWxpIG9yxJnFvGVtIGJydXRhbG55bS4nO1xyXG4gICAgfSBlbHNlIGlmIChpZHggPT09IDEpIHtcclxuICAgICAgICBzdHJpbmcgPSAndWRlcnplbmllIG5hIGR5c3RhbnMgLSBjenlsaSBvcsSZxbxlbSBzdHJ6ZWxlY2tpbS4nO1xyXG4gICAgfSBlbHNlIGlmIChpZHggPT09IDIpIHtcclxuICAgICAgICBzdHJpbmcgPSAndWRlcnplbmllIGxla2vEhSBicm9uacSFIGJpYcWCxIUgLSBjenlsaSBvcsSZxbxlbSB6ZHJhZHppZWNraW0uJztcclxuICAgIH0gZWxzZSBpZiAoaWR4ID09PSAzKSB7XHJcbiAgICAgICAgc3RyaW5nID0gJ3VkZXJ6ZW5pZSB3eWJ1Y2hvd8SFIGJyb25pxIUgYWxjaGVtaWN6bsSFIC0gY3p5bGkgb3LEmcW8ZW0gc3phbGXFhGN6eW0uJztcclxuICAgIH0gZWxzZSBpZiAoaWR4ID09PSA0KSB7XHJcbiAgICAgICAgc3RyaW5nID0gJ3VkZXJ6ZW5pZSBtYWdpY3puxIUgbW9jxIUgLSBjenlsaSBvcsSZxbxlbSBjemFyb3duaWthLic7XHJcbiAgICB9IGVsc2UgaWYgKGlkeCA9PT0gNSkge1xyXG4gICAgICAgIHN0cmluZyA9ICd1ZGVyemVuaWUgY3p5bWtvbHdpZWssIGNvIHdwYWRuaWUga2FyxYJvd2kgdyBwbHVnYXdlIMWCYXBza2EgLSBjenlsaSBixYJhemXFhHNraW0gb3LEmcW8ZW0gcG9udXJlZ28gZG93Y2lwbmlzaWEuJztcclxuICAgIH1cclxuICAgIHVzZVRoaXNWYWx1ZVRvQ3JlYXRlRGVzY3JpcHRpb24oc3RyaW5nLCAyKTtcclxuICAgIHVzZVRoaXNWYWx1ZVRvQ3JlYXRlRGVzY3JpcHRpb24oXCJcIiwgMSk7XHJcbn1cclxuXHJcbi8qZnVuY3Rpb24gaW5pdFVzZXJGbG93VmlhU2VjdGlvbl9zZWxlY3ROb2Rlc1RvVGhpc1Byb2Nlc3MgKCkge1xyXG4gIGxldCBub2RlcyA9IFtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJrbGFzYVwiXScpLFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0W25hbWU9XCJ1ZGVyemVuaWVcIl0nKSxcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJuYXp3YXVkZXJ6ZW5pYVwiXScpXHJcbiAgXVxyXG4gIGluaXRVc2VyRmxvd1ZpYVNlY3Rpb25fZ29Ub05leHROb2RlKG5vZGVzKTtcclxuICAvL25vZGVzWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vbGV0IGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGQtQV9idG4tYmVsdF9idG4tcG9zaXRpb25lci5zZWNvbmRTZWN0aW9uQnRuJylcclxuICAgIC8vbGV0IGJ0bk9mVGhpc1NlY3Rpb24gPSBidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0bicpXHJcbiAgIC8vIHNob3dCdG5PZkFjY2VwdGFuY2UoYnRuT2ZUaGlzU2VjdGlvbiwgYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24pXHJcbiAgLy99KVxyXG59XHJcbmZ1bmN0aW9uIGluaXRVc2VyRmxvd1ZpYVNlY3Rpb25fZ29Ub05leHROb2RlKG5vZGVzKXtcclxuICAgIGxldCBhbW91bnQgPSBub2Rlcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8YW1vdW50OyBpKyspe1xyXG4gICAgICAgIGxldCBub2RlU2V0ID0gbm9kZXNbaV07XHJcbiAgICAgICAgbGV0IG9wdEl0ZXJhdG9yID0gbm9kZVNldC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqPG9wdEl0ZXJhdG9yOyBqKyspe1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gbm9kZVNldFtqXTtcclxuICAgICAgICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBnb1RvTmV4dE5vZGUobm9kZXMsIGkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuKi8iLCJpbXBvcnQge3Nob3dCdG5PZkFjY2VwdGFuY2V9IGZyb20gJy4vZm9ybV9pbml0aWFsaXplTmV4dFNlY3Rpb24uanMnO1xyXG4ndXNlIHN0cmljdCc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplVXNlckZsb3dWaWFTZWN0aW9uT2ZEZWZlbmRzKTtcclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVVzZXJGbG93VmlhU2VjdGlvbk9mRGVmZW5kcygpe1xyXG4gICAgaW5pdGlhbGl6ZVRoaXNTZWN0aW9uKCk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRoaXNTZWN0aW9uKCkge1xyXG4gICAgbGV0IGxpc3RBID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc2V0LWMgI3phc2xvbmFcIlxyXG4gICAgKTtcclxuICAgIGxldCBsaXN0QiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNldC1jICNwYW5jZXJ6XCJcclxuICAgICk7XHJcbiAgICBsZXQgaW1hZ2VzQSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZHNldC1jX2ltZ3NfaW1nLmFcIlxyXG4gICAgKTtcclxuICAgIGxldCBpbWFnZXNCID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkc2V0LWNfaW1nc19pbWcuYlwiXHJcbiAgICApO1xyXG4gICAgbGV0IG9wdHNBID0gbGlzdEEucXVlcnlTZWxlY3RvckFsbChcIm9wdGlvblwiKTtcclxuICAgIGxldCBvcHRzQiA9IGxpc3RCLnF1ZXJ5U2VsZWN0b3JBbGwoXCJvcHRpb25cIik7XHJcbiAgICBkeW5hbWl6ZVRoaXNMaXN0KGxpc3RBLCBvcHRzQSwgaW1hZ2VzQSwgbGlzdEIpO1xyXG4gICAgZHluYW1pemVUaGlzTGlzdChsaXN0Qiwgb3B0c0IsIGltYWdlc0IsIGxpc3RBKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHluYW1pemVUaGlzTGlzdChsaXN0LCBvcHRzLCBpbWFnZXMsIG90aGVyTGlzdCkge1xyXG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBsaXN0LnZhbHVlO1xyXG4gICAgICAgIGxldCBpdGVyID0gb3B0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBpdGVyIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgIGltYWdlc1tqXS5jbGFzc0xpc3QuYWRkKFwiaXRJc1Vuc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHQgPSBvcHRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgb3B0VmFsdWUgPSBvcHQudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gb3B0VmFsdWUgJiYgaSAhPT0gMykge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJpdElzVW5zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbmFibGVOZXh0Rm9ybVBhcnQobGlzdCwgb3RoZXJMaXN0KTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGVuYWJsZU5leHRGb3JtUGFydChsaXN0LCBvdGhlckxpc3QpIHtcclxuICAgIGxldCBhID0gbGlzdC52YWx1ZTtcclxuICAgIGxldCBiID0gb3RoZXJMaXN0LnZhbHVlO1xyXG4gICAgaWYgKGEgIT09IFwiXCIgJiYgYiAhPT0gXCJcIikge1xyXG4gICAgICAgIC8qbGV0IG5leHRQYXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcnB1c19zZWN0aW9uX2Zvcm1fZmllbGRzLTInKTtcclxuICAgICAgICBuZXh0UGFydC5jbGFzc0xpc3QucmVtb3ZlKCdpdElzSGlkZGVuJyk7XHJcbiAgICAgICAgbGV0IGFsbE9ybmFtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZy5jb3JwdXNfc2VjdGlvbl9mb3JtX29ybmFtZW50LW1hcmtlcicpO1xyXG4gICAgICAgIGxldCB0aGlzT3JuYW1lbnQgPSBhbGxPcm5hbWVudHNbMl07XHJcbiAgICAgICAgdGhpc09ybmFtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy4vaWNvbnMvcG9sZS4yLnN2ZycpO1xyXG4gICAgICAgIHRoaXNPcm5hbWVudC5jbGFzc0xpc3QuYWRkKCdpdElzUGFzc2VkVGhyb3VnaHQnKTtcclxuICAgICAgICBsZXQgbmV4dE9ybmFtZW50ID0gYWxsT3JuYW1lbnRzWzNdO1xyXG4gICAgICAgIG5leHRPcm5hbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpdElzSGlkZGVuJyk7Ki9cclxuICAgICAgICBpbml0VXNlckZsb3dUb05leHRTZWN0aW9uX3Nob3dCdG5PZkFjY2VwdGFuY2UoKTtcclxuICAgICAgICAvL2d1aWRlUmVhY3RzKDUpO1xyXG4gICAgfVxyXG59XHJcbmxldCBjb250cm9sbGVyID0gMDtcclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKCkge1xyXG4gICAgaWYgKGNvbnRyb2xsZXIgPT09IDApIHtcclxuICAgICAgICBsZXQgYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkLUFfYnRuLWJlbHRfYnRuLXBvc2l0aW9uZXIuZmlmdGhTZWN0aW9uQnRuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBidG5PZlRoaXNTZWN0aW9uID0gYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0blwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzaG93QnRuT2ZBY2NlcHRhbmNlKGJ0bk9mVGhpc1NlY3Rpb24sIGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uKTtcclxuICAgICAgICBjb250cm9sbGVyID0gMTtcclxuICAgIH1cclxufSIsImltcG9ydCBpdGVyYXRvck9mUG9pbnRzTGVmdCBmcm9tICcuL2FzaWRlLmpzJztcclxuaW1wb3J0IHtndWlkZVJlYWN0c30gZnJvbSAnLi9hc2lkZS5qcyc7XHJcbmltcG9ydCB7XHJcbiAgICBzaG93QnRuT2ZBY2NlcHRhbmNlXHJcbn0gZnJvbSAnLi9mb3JtX2luaXRpYWxpemVOZXh0U2VjdGlvbi5qcyc7XHJcbid1c2Ugc3RyaWN0JztcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRpYWxpemVUaGlzU2VsZWN0KVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRoaXNTZWxlY3QoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkcy0yX2ZpZWxkc2V0LWRfY29udGFpbmVyX21vY2UnKTtcclxuICAgIGxldCBpdGVyID0gb3B0aW9ucy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXI7IGkrKykge1xyXG4gICAgICAgIGxldCBvcHQgPSBvcHRpb25zW2ldO1xyXG4gICAgICAgIG9wdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaXRJc0NsaWNrZWQob3B0LCBvcHRpb25zLCBpdGVyLCBpKTtcclxuICAgICAgICAgICAgaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpdElzQ2xpY2tlZChvcHQsIG9wdHMsIGl0ZXIsIGkpIHtcclxuICAgIGxldCBjaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwibW9jLXBpZXRub1wiXScpO1xyXG4gICAgbGV0IGNvc3RPZlRoaXMgPSBbMSwyLDIsMSwzLDFdO1xyXG4gICAgaWYgKGNoZWNrc1tpXS5jaGVja2VkPT09dHJ1ZSl7XHJcbiAgICAgICAgY2hlY2tzW2ldLmNoZWNrZWQ9ZmFsc2U7XHJcbiAgICAgICAgaXRlcmF0b3JPZlBvaW50c0xlZnQuaXRlcmF0b3JCKGNvc3RPZlRoaXNbaV0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY2hlY2tzW2ldLmNoZWNrZWQ9dHJ1ZTtcclxuICAgICAgICBpdGVyYXRvck9mUG9pbnRzTGVmdC5kZWxldGF0b3JCKGNvc3RPZlRoaXNbaV0pO1xyXG4gICAgICAgIC8vZ3VpZGVSZWFjdHMoNik7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGl0ZXI7IGorKykge1xyXG4gICAgICAgIGlmIChjaGVja3Nbal0uY2hlY2tlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBvcHRzW2pdLmNsYXNzTGlzdC5yZW1vdmUoJ2l0SXNIaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWNrc1tqXS5jaGVja2VkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBvcHRzW2pdLmNsYXNzTGlzdC5hZGQoJ2l0SXNIaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxubGV0IGNvbnRyb2xsZXIgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdFVzZXJGbG93VG9OZXh0U2VjdGlvbl9zaG93QnRuT2ZBY2NlcHRhbmNlKCkge1xyXG4gICAgaWYgKGNvbnRyb2xsZXIgPT09IDApIHtcclxuICAgICAgICBsZXQgYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICBcIi5jb3JwdXNfc2VjdGlvbl9mb3JtX2ZpZWxkLUFfYnRuLWJlbHRfYnRuLXBvc2l0aW9uZXIuc2l4dGhTZWN0aW9uQnRuXCJcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBidG5PZlRoaXNTZWN0aW9uID0gYnRuQ29udGFpbmVyRm9yVGhpc1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICAgXCIuY29ycHVzX3NlY3Rpb25fZm9ybV9maWVsZC1BX2J0bi1iZWx0X2J0bi1wb3NpdGlvbmVyX2J0blwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzaG93QnRuT2ZBY2NlcHRhbmNlKGJ0bk9mVGhpc1NlY3Rpb24sIGJ0bkNvbnRhaW5lckZvclRoaXNTZWN0aW9uKTtcclxuICAgICAgICBjb250cm9sbGVyID0gMTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0aWFsaXplR3VpZGUiLCJoaWRlVXNlckd1aWRlIiwic2V0VGltZW91dCIsImFzaWRlIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsIm9ybm0iLCJyb3RhdGVBbmRIaWRlQXNpZGUiLCJidG4iLCJjb250cm9sbGVyIiwiaGVhZEJlbHQiLCJwaWVjZSIsIm9mZnNldEhlaWdodCIsInN0eWxlIiwidHJhbnNmb3JtIiwiYXciLCJvZmZzZXRXaWR0aCIsImFoIiwid3NwIiwieCIsInkiLCJ6IiwibGVmdCIsImJvdHRvbSIsImd1aWRlUmVhY3RzIiwiaSIsInJlbW92ZSIsInNoYWtlVG9Gb2N1c1VzZXJzQXR0ZW50aW9uIiwiZ3VpZGUiLCJ0aXRsZSIsImFyciIsImlubmVyVGV4dCIsImFyckIiLCJpdGVyYXRvck9mUG9pbnRzTGVmdCIsInNwZW50T25BdHRhY2siLCJpdGVyYXRvciIsImNvbnQiLCJpdGVyRGV2aWNlIiwib3B0IiwicXVlcnlTZWxlY3RvckFsbCIsInBvaW50cyIsImFtb3VudCIsImxlbmd0aCIsImJpbGFucyIsImFuaW1hdGVPcHRzU3BlbmRpbmciLCJkZWxldGF0b3IiLCJjb2luIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImF4UyIsIndpbmRvdyIsInNjcm9sbFkiLCJheFgiLCJvZmZzZXRUb3AiLCJheFoiLCJheFkiLCJvZmZzZXRMZWZ0IiwidG9wIiwiYXBwZW5kQ2hpbGQiLCJ3aWR0aCIsImhlaWdodCIsInJlbW92ZUNoaWxkIiwiaXRlcmF0b3JCIiwiaW50ZWdlciIsImRlbGV0YXRvckIiLCJlcXVhbGl6YXRvciIsImluaXQiLCJidG5zIiwiYmVsdHMiLCJpdGVyIiwiYXR0cnliIiwiYmVsdCIsImFkZFBvaW50IiwiSU1HIiwiZGVsZXRlVGhpc0lNRyIsImluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0xhc3RCdG5PZkFjY2VwdGFuY2UiLCJidG5Db250YWluZXJGb3JUaGlzU2VjdGlvbiIsImJ0bk9mVGhpc1NlY3Rpb24iLCJzaG93QnRuT2ZBY2NlcHRhbmNlIiwiY2xpY2tCdG5PZkFjY2VwdGFuY2UiLCJjbGlja0J0biIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwidGhpcyIsImluaXRpYWxpemVCdG5zT2ZBY2NlcHRhbmNlIiwiYWNjZXB0YXRpb25CdG4iLCJjb250YWlucyIsInNpZ25UaGlzQXNDbGlja2VkIiwiaW5pdGlhbGl6ZU5leHRTZWN0aW9uIiwiaW5pdEFnYWluR3VpZGVUZXh0Rm9yVGhpc1NlY3Rpb24iLCJhbGxPcm5hbWVudHMiLCJ0aGlzT3JuYW1lbnQiLCJuZXh0T3JuYW1lbnQiLCJ6ZW5zY3JvbGwiLCJ0b1kiLCJlbmFibGVOZXh0U2VjdGlvbiIsIlBvc2l0aW9uQSIsIlBvc2l0aW9uQiIsIlBvc2l0aW9uQyIsImFsbFNlY3Rpb25zIiwidW5kZWZpbmVkIiwiY29udGFpbmVyIiwiaW5pdGlhbGl6ZVVzZXJGbG93VmlhU2VjdGlvbk9mRGVzY3JpcHRpb25zIiwic3RyaWtlTmFtZSIsInNob3dEZXNjcmlwdGlvbiIsImluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fc2hvd0J0bk9mQWNjZXB0YW5jZSIsInZhbHVlIiwidHJpbSIsInVzZVRoaXNWYWx1ZVRvQ3JlYXRlRGVzY3JpcHRpb24iLCJzdHJpbmciLCJzcGFucyIsIm9ubHlPbmNlIiwiaXRlbSIsImluaXRVc2VyRmxvd1ZpYVNlY3Rpb25fc2VsZWN0Tm9kZXNUb1RoaXNQcm9jZXNzIiwibm9kZXMiLCJmb3JFYWNoIiwibm9kZSIsImlkeCIsImV2ZW50Iiwic2VjdGlvbkNvbXBsZXRlZCIsImluaXRVc2VyRmxvd1RvTmV4dFNlY3Rpb25fY2hlY2tJZlRoaXNTZWN0aW9uSXNDb21wbGV0ZWQiLCJrZXlDb2RlIiwiaW5pdFVzZXJGbG93VmlhU2VjdGlvbl9nb1RvTmV4dE5vZGUiLCJibHVyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImZvY3VzIiwiaW5kZXhPZiIsIm9iamVjdFRvQXJyYXkiLCJvYmplY3QiLCJhcnJheSIsInB1c2giLCJpbml0aWFsaXplQXR0YWNrc1BhcnQiLCJlbmFibGVBdHRhY2tzIiwiYXR0YWNrcyIsImF0dGFjayIsIm9wdGlvbnMiLCJzeW5jaHJvbml6ZUJhY2tncm91bmRzT25DaGFuZ2UiLCJzZW5kTGlzdFZhbHVlVG9GdW5jdGlvblRoYXRTZW5kc0l0RnVydGhlciIsInNlbmRJTUdsaXN0VG9GdW5jdGlvblRoYXRTZW5kc0l0RnVydGhlciIsInNlbmRQb3dlcnNUb0Z1bmN0aW9uVGhhdFNlbnNJdEZ1cnRoZXIiLCJzeW5jaHJvbml6ZUJhY2tncm91bmRzT25CbHVyIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJjaGlsZHJlbiIsImxpc3QiLCJoaWdobGlnaHRCYWNrZ3JvdW5kIiwiY2hhbmdlRXYiLCJpbml0RXZlbnQiLCJ0eXBlIiwidG9Mb3dlckNhc2UiLCJzZW5kSU1HIiwiYmVsdE9mSW1hZ2VzIiwiaW1hZyIsImdldEF0dHJpYnV0ZSIsImljb24iLCJhbGxJTUdzIiwic3RhbmRhcnQiLCJpbWFnZVRvRGVsIiwiaiIsInRoZUlNRyIsInNvdXJjZUlNRyIsIm5ld0lNRyIsIm9wdHMiLCJzdHJuZyIsIklNR3MiLCJqb2luIiwiYXZhdGFyT2JqZWN0cyIsImF2YXRhcnMiLCJhdmF0YXJJc0NsaWNrZWQiLCJzZW5kQXZhdGFyc1ZhbHVlVG9GdW5jdGlvblRoYXRTZW5kSXRGdXJ0aGVyIiwiYXZhdGFyIiwiYXYiLCJjaGVja2VkIiwiaW5pdGlhbGl6ZVVzZXJGbG93VmlhU2VjdGlvbk9mRGVmZW5kcyIsImluaXRpYWxpemVUaGlzU2VjdGlvbiIsImxpc3RBIiwibGlzdEIiLCJpbWFnZXNBIiwiaW1hZ2VzQiIsIm9wdHNBIiwib3B0c0IiLCJkeW5hbWl6ZVRoaXNMaXN0IiwiaW1hZ2VzIiwib3RoZXJMaXN0Iiwib3B0VmFsdWUiLCJlbmFibGVOZXh0Rm9ybVBhcnQiLCJhIiwiYiIsImluaXRpYWxpemVUaGlzU2VsZWN0IiwiaXRJc0NsaWNrZWQiLCJjaGVja3MiLCJjb3N0T2ZUaGlzIl0sIm1hcHBpbmdzIjoiOzs7SUFBQUEsU0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDQyxlQUE5Qzs7SUFFQSxTQUFTQSxlQUFULEdBQTJCO0lBQ3pCQztJQUNBQyxhQUFXLFlBQVk7SUFDckIsUUFBSUMsUUFBUUwsU0FBU00sYUFBVCxDQUF1QixPQUF2QixDQUFaO0lBQ0FELFVBQU1FLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLFFBQXBCO0lBQ0QsR0FIRCxFQUdHLENBSEg7SUFJRDs7SUFFRCxTQUFTTCxhQUFULEdBQXlCO0lBQ3ZCLE1BQUlNLE9BQU9ULFNBQVNNLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBWDtJQUNBRyxPQUFLUixnQkFBTCxDQUFzQixPQUF0QixFQUErQlMsa0JBQS9CO0lBQ0EsTUFBSUMsTUFBTVgsU0FBU00sYUFBVCxDQUF1QixrQkFBdkIsQ0FBVjtJQUNBSyxNQUFJVixnQkFBSixDQUFxQixPQUFyQixFQUE4QlMsa0JBQTlCO0lBQ0Q7SUFDRCxJQUFJRSxhQUFhLENBQWpCOztJQUVBLFNBQVNGLGtCQUFULEdBQThCO0lBQzVCLE1BQUlMLFFBQVFMLFNBQVNNLGFBQVQsQ0FB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
