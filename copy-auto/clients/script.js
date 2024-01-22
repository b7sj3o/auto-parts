window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t395_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var allRecords = document.getElementById('allrecords');
    var tildaMode = allRecords ? allRecords.getAttribute('data-tilda-mode') : '';
    var tildaLazyMode = allRecords ? allRecords.getAttribute('data-tilda-lazy') : '';
    var tabs = rec ? rec.querySelectorAll('.t395__tab') : [];
    if (tildaMode !== 'edit' && tildaMode !== 'preview') {
        setTimeout(function() {
            t395_scrollToTabs(recid)
        }, 300)
    }
    Array.prototype.forEach.call(tabs, function(tab, i) {
        tab.addEventListener('click', function(e) {
            var targetTab = e.target.closest('.t395__tab');
            if (targetTab && targetTab.classList.contains('t395__tab_active') && !e.isTrusted)
                return;
            var activeTab = rec.querySelector('.t395__tab_active');
            if (activeTab)
                activeTab.classList.remove('t395__tab_active');
            targetTab.classList.add('t395__tab_active');
            t395_removeUrl();
            var tabNumber = i + 1;
            if (tildaMode !== 'edit' && tildaMode !== 'preview' && tabNumber && typeof history.replaceState !== 'undefined') {
                try {
                    window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumber)
                } catch (err) {}
            }
            t395_alltabs_updateContent(recid);
            t395_updateSelect(recid);
            var hookBlocks = targetTab.getAttribute('data-tab-rec-ids').split(',');
            var event = document.createEvent('Event');
            event.initEvent('displayChanged', !0, !0);
            var hooksCopy = hookBlocks.slice();
            hooksCopy.forEach(function(recid) {
                var currentRec = document.getElementById('rec' + recid);
                if (!currentRec)
                    return;
                var recordType = currentRec.getAttribute('data-record-type');
                if (recordType === '395' || recordType === '397') {
                    var selector = '.t' + recordType + '__tab_active';
                    var activeIDs = currentRec.querySelector(selector).getAttribute('data-tab-rec-ids');
                    activeIDs = activeIDs.split(',');
                    hookBlocks = hookBlocks.concat(activeIDs)
                }
            });
            hookBlocks.forEach(function(curRecid) {
                var currentRec = document.getElementById('rec' + curRecid);
                if (!currentRec)
                    return;
                var currentRecChildren = currentRec.querySelectorAll('.t-feed, .t-store, .t-store__product-snippet, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t400, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t448, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t569, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t730, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t813, .t814, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t889, .t902, .t912, .t923, .t937, .t958, .t959, .t979, .t982, .t983, .t989, .t994, .t1053, .t1067, .t1068, .t1069, .t1070, .t1071, .t1072');
                Array.prototype.forEach.call(currentRecChildren, function(child) {
                    child.dispatchEvent(event)
                });
                var displayChangedBlock = currentRec.querySelector('[data-display-changed="true"]');
                if (displayChangedBlock)
                    displayChangedBlock.dispatchEvent(event)
            });
            var galaxyEffectBlocks = document.querySelectorAll('.t826');
            Array.prototype.forEach.call(galaxyEffectBlocks, function(galaxyEffectBlock) {
                galaxyEffectBlock.dispatchEvent(event)
            });
            t395_startUpdateLazyLoad(targetTab);
            if (window.lazy === 'y' || tildaLazyMode === 'yes') {
                t_onFuncLoad('t_lazyload_update', function() {
                    t_lazyload_update()
                })
            }
        })
    });
    if (tabs.length) {
        t395_alltabs_updateContent(recid);
        t395_updateContentBySelect(recid);
        var bgColor = rec ? rec.style.backgroundColor : '#ffffff';
        var bgColorTargets = rec.querySelectorAll('.t395__select, .t395__firefoxfix');
        Array.prototype.forEach.call(bgColorTargets, function(target) {
            target.style.background = bgColor
        })
    }
}
function t395_alltabs_updateContent(recid) {
    var rec = document.getElementById('rec' + recid);
    var activeTabs = rec ? rec.querySelectorAll('.t395__tab_active') : null;
    var select = rec ? rec.querySelector('.t395__select') : null;
    var tabs = rec.querySelectorAll('.t395__tab');
    if (activeTabs.length !== 1)
        return !1;
    var activeTab = activeTabs[0];
    var hookBlocks = activeTab.getAttribute('data-tab-rec-ids').split(',');
    var noActive = [];
    var popupBlocks = [190, 217, 312, 331, 358, 364, 365, 390, 702, 706, 746, 750, 756, 768, 862, 868, 890, 945, 1013, 1014];
    Array.prototype.forEach.call(tabs, function(tab) {
        if (tab !== activeTab) {
            var noActiveHooks = tab.getAttribute('data-tab-rec-ids').split(',');
            noActiveHooks.forEach(function(hook) {
                if (noActive.indexOf(hook) === -1 && hookBlocks.indexOf(hook) === -1)
                    noActive.push(hook)
            })
        }
    });
    if (t395_checkVisibillityEl(activeTab) || t395_checkVisibillityEl(select)) {
        hookBlocks.forEach(function(hook) {
            if (hook) {
                var hookEl = document.getElementById('rec' + hook);
                var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
                if (hookEl) {
                    hookEl.classList.remove('t395__off');
                    hookEl.style.opacity = ''
                }
                t395_updateTabsByHook(hookElRecordType, hookEl, hook, recid)
            }
        })
    } else {
        hookBlocks.forEach(function(hook) {
            var hookEl = document.getElementById('rec' + hook);
            var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
            var isPopupBlock = popupBlocks.some(function(id) {
                return hookElRecordType == id
            });
            if (hookEl && !isPopupBlock) {
                hookEl.setAttribute('data-animationappear', 'off');
                hookEl.classList.add('t395__off')
            }
        })
    }
    noActive.forEach(function(noActiveID) {
        if (!noActiveID)
            return;
        var hookEl = document.getElementById('rec' + noActiveID);
        var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
        var isPopupBlock = popupBlocks.some(function(id) {
            return hookElRecordType == id
        });
        if (hookEl && !isPopupBlock) {
            hookEl.setAttribute('data-connect-with-tab', 'yes');
            hookEl.setAttribute('data-animationappear', 'off');
            hookEl.classList.add('t395__off')
        }
        t395_updateTabsByHook(hookElRecordType, hookEl, noActiveID, recid)
    });
    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    if (scrollHeight - window.innerHeight < window.pageYOffset) {
        window.scrollTo(0, 0)
    }
}
function t395_updateTabsByHook(hookElRecordType, hookEl, currentID, recid) {
    var hookElTab;
    switch (hookElRecordType) {
    case '395':
        if (window.t395_alltabs_updateContent && window.t395_updateSelect && recid !== currentID) {
            window.t395_alltabs_updateContent(currentID);
            window.t395_updateSelect(currentID);
            hookElTab = hookEl ? hookEl.querySelector('.t395__tab') : null;
            if (hookElTab)
                hookElTab.click()
        }
        break;
    case '397':
        if (recid !== currentID) {
            t397_alltabs_updateContent(currentID);
            t397_updateSelect(currentID);
            hookElTab = hookEl ? hookEl.querySelector('.t397__tab') : null;
            if (hookElTab)
                hookElTab.click()
        }
        break
    }
}
function t395_checkVisibillityEl(el) {
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length))
}
function t395_updateContentBySelect(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var select = rec.querySelector('.t395__select');
    if (select) {
        select.addEventListener('change', function() {
            var currentValue = select.value;
            var tabIndex = rec.querySelector('.t395__tab[data-tab-rec-ids=\'' + currentValue + '\']');
            if (tabIndex)
                tabIndex.click()
        })
    }
}
function t395_updateSelect(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var activeTab = rec.querySelector('.t395__tab_active');
    var currentTabHooks = activeTab ? activeTab.getAttribute('data-tab-rec-ids') : '';
    var select = rec.querySelector('.t395__select');
    if (select)
        select.value = currentTabHooks
}
function t395_startUpdateLazyLoad(el) {
    var hookBlocks = el ? el.getAttribute('data-tab-rec-ids').split(',') : [];
    hookBlocks.forEach(function(hook) {
        var rec = document.getElementById('rec' + hook);
        if (!rec)
            return;
        var videos = rec.querySelectorAll('.t-video-lazyload');
        if (videos.length) {
            t395_updateVideoLazyLoad(videos)
        }
    })
}
function t395_updateVideoLazyLoad(videos) {
    setTimeout(function() {
        Array.prototype.forEach.call(videos, function(video) {
            if (!video.classList.contains('t-video__isload')) {
                var heightAttribute = video.getAttribute('data-videolazy-height');
                var height = heightAttribute ? heightAttribute : '100%';
                if (height.indexOf('vh') !== -1)
                    height = '100%';
                var videoID = video.getAttribute('data-videolazy-id');
                videoID = videoID ? videoID.trim() : '';
                var blockID = video.getAttribute('data-blocklazy-id');
                var twoIdAttr = video.getAttribute('data-videolazy-two-id');
                var videoTwoID = twoIdAttr ? '_' + twoIdAttr + '_' : '';
                if (video.getAttribute('data-videolazy-type') === 'youtube') {
                    var oldIframe = video.querySelector('iframe');
                    if (oldIframe && oldIframe.parentNode)
                        oldIframe.parentNode.removeChild(oldIframe);
                    var iframe = document.createElement('iframe');
                    iframe.id = 'youtubeiframe' + videoTwoID + blockID;
                    iframe.width = '100%';
                    iframe.height = height;
                    iframe.src = 'https://www.youtube.com/embed/' + videoID + '?rel=0&fmt=18&html5=1&showinfo=0';
                    iframe.frameBorder = '0';
                    iframe.setAttribute('allowfullscreen', '');
                    video.insertAdjacentElement('beforeend', iframe)
                }
            }
            video.classList.add('t-video__isload')
        })
    }, 2)
}
function t395_scrollToTabs(recid) {
    var rec = document.getElementById('rec' + recid);
    var curUrl = window.location.href;
    var tabIndexNumber = curUrl.indexOf('#!/tab/');
    if (tabIndexNumber === -1)
        return !1;
    var tabIndexNumberStart = curUrl.indexOf('tab/');
    var firstOptionSelect = rec ? rec.querySelector('.t395__wrapper_mobile .t395__select option') : null;
    if (firstOptionSelect)
        firstOptionSelect.selected = !1;
    var tabRec = curUrl.substring(tabIndexNumberStart + 4, tabIndexNumberStart + 4 + recid.length);
    if (tabRec !== recid)
        return !1;
    var tabBlock = rec ? rec.querySelector('.t395') : null;
    var tabNumber = parseInt(curUrl.slice(tabIndexNumberStart + 4 + recid.length + 1), 10);
    var tabs = rec.querySelectorAll('.t395__tab');
    Array.prototype.forEach.call(tabs, function(tab, i) {
        if (i === tabNumber - 1) {
            tab.click();
            tab.classList.add('t395__tab_active')
        } else {
            tab.classList.remove('t395__tab_active')
        }
    });
    var tabsMob = rec.querySelectorAll('.t395__wrapper_mobile .t395__select option');
    var activeTabMob = tabsMob.length ? tabsMob[tabNumber - 1] : null;
    if (activeTabMob)
        activeTabMob.selected = !0;
    var targetOffset = tabBlock.getBoundingClientRect().top + window.pageYOffset;
    var target = window.innerWidth > 960 ? targetOffset - 200 : targetOffset - 100;
    if (target < 0)
        target = 0;
    t395_scrollToEl(target)
}
function t395_scrollToEl(elTopPos) {
    if (elTopPos === window.pageYOffset)
        return !1;
    var duration = 300;
    var difference = window.pageYOffset;
    var cashedDiff = window.pageYOffset;
    var step = 10 * (elTopPos || window.pageYOffset) / duration;
    var timer = setInterval(function() {
        if (cashedDiff > elTopPos) {
            difference -= step
        } else {
            difference += step
        }
        window.scrollTo(0, difference);
        document.body.setAttribute('data-scrollable', 'true');
        if (cashedDiff > elTopPos && window.pageYOffset <= elTopPos || cashedDiff <= elTopPos && window.pageYOffset >= elTopPos) {
            document.body.removeAttribute('data-scrollable');
            clearInterval(timer)
        }
    }, 10);
    var timer2 = setTimeout(function() {
        clearInterval(timer);
        document.body.removeAttribute('data-scrollable');
        clearTimeout(timer2)
    }, duration * 2)
}
function t395_removeUrl() {
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tab/');
    if (indexToRemove === -1) {
        indexToRemove = curUrl.indexOf('%23!/tab/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    if (indexToRemove !== -1) {
        if (typeof history.replaceState != 'undefined') {
            try {
                window.history.replaceState('', '', curUrl)
            } catch (err) {}
        }
    }
}
function t228__init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlock = rec.querySelector('.t228');
    var mobileMenu = rec.querySelector('.t228__mobile');
    var menuSubLinkItems = rec.querySelectorAll('.t-menusub__link-item');
    var rightBtn = rec.querySelector('.t228__right_buttons_but .t-btn');
    var mobileMenuPosition = mobileMenu ? mobileMenu.style.position || window.getComputedStyle(mobileMenu).position : '';
    var mobileMenuDisplay = mobileMenu ? mobileMenu.style.display || window.getComputedStyle(mobileMenu).display : '';
    var isFixedMobileMenu = mobileMenuPosition === 'fixed' && mobileMenuDisplay === 'block';
    var overflowEvent = document.createEvent('Event');
    var noOverflowEvent = document.createEvent('Event');
    overflowEvent.initEvent('t228_overflow', !0, !0);
    noOverflowEvent.initEvent('t228_nooverflow', !0, !0);
    if (menuBlock) {
        menuBlock.addEventListener('t228_overflow', function() {
            t228_checkOverflow(recid)
        });
        menuBlock.addEventListener('t228_nooverflow', function() {
            t228_checkNoOverflow(recid)
        })
    }
    rec.addEventListener('click', function(e) {
        var targetLink = e.target.closest('.t-menusub__target-link');
        if (targetLink && window.isMobile) {
            if (targetLink.classList.contains('t-menusub__target-link_active')) {
                if (menuBlock)
                    menuBlock.dispatchEvent(overflowEvent)
            } else {
                if (menuBlock)
                    menuBlock.dispatchEvent(noOverflowEvent)
            }
        }
        var currentLink = e.target.closest('.t-menu__link-item:not(.tooltipstered):not(.t-menusub__target-link):not(.t794__tm-link):not(.t966__tm-link):not(.t978__tm-link):not(.t978__menu-link)');
        if (currentLink && mobileMenu && isFixedMobileMenu)
            mobileMenu.click()
    });
    Array.prototype.forEach.call(menuSubLinkItems, function(linkItem) {
        linkItem.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    });
    if (rightBtn) {
        rightBtn.addEventListener('click', function() {
            if (mobileMenu && isFixedMobileMenu)
                mobileMenu.click()
        })
    }
    if (menuBlock) {
        menuBlock.addEventListener('showME601a', function() {
            var menuLinks = rec.querySelectorAll('.t966__menu-link');
            Array.prototype.forEach.call(menuLinks, function(menuLink) {
                menuLink.addEventListener('click', function() {
                    if (mobileMenu && isFixedMobileMenu)
                        mobileMenu.click()
                })
            })
        })
    }
}
function t228_checkOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t228') : null;
    if (!menu)
        return;
    var mobileContainer = document.querySelector('.t228__mobile_container');
    var mobileContainerHeight = t228_getFullHeight(mobileContainer);
    var windowHeight = document.documentElement.clientHeight;
    var menuPosition = menu.style.position || window.getComputedStyle(menu).position;
    if (menuPosition === 'fixed') {
        menu.classList.add('t228__overflow');
        menu.style.setProperty('height', (windowHeight - mobileContainerHeight) + 'px', 'important')
    }
}
function t228_checkNoOverflow(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var menu = rec.querySelector('.t228');
    var menuPosition = menu ? menu.style.position || window.getComputedStyle(menu).position : '';
    if (menuPosition === 'fixed') {
        if (menu)
            menu.classList.remove('t228__overflow');
        if (menu)
            menu.style.height = 'auto'
    }
}
function t228_setWidth(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuCenterSideList = rec.querySelectorAll('.t228__centerside');
    Array.prototype.forEach.call(menuCenterSideList, function(menuCenterSide) {
        menuCenterSide.classList.remove('t228__centerside_hidden')
    });
    if (window.innerWidth <= 980)
        return;
    var menuBlocks = rec.querySelectorAll('.t228');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var maxWidth;
        var centerWidth = 0;
        var paddingWidth = 40;
        var leftSide = menu.querySelector('.t228__leftside');
        var rightSide = menu.querySelector('.t228__rightside');
        var menuList = menu.querySelector('.t228__list');
        var mainContainer = menu.querySelector('.t228__maincontainer');
        var leftContainer = menu.querySelector('.t228__leftcontainer');
        var rightContainer = menu.querySelector('.t228__rightcontainer');
        var centerContainer = menu.querySelector('.t228__centercontainer');
        var centerContainerLi = centerContainer ? centerContainer.querySelectorAll('li') : [];
        var leftContainerWidth = t228_getFullWidth(leftContainer);
        var rightContainerWidth = t228_getFullWidth(rightContainer);
        var mainContainerWidth = mainContainer ? mainContainer.offsetWidth : 0;
        var dataAlign = menu.getAttribute('data-menu-items-align');
        var isDataAlignCenter = dataAlign === 'center' || dataAlign === null;
        maxWidth = leftContainerWidth >= rightContainerWidth ? leftContainerWidth : rightContainerWidth;
        maxWidth = Math.ceil(maxWidth);
        Array.prototype.forEach.call(centerContainerLi, function(li) {
            centerWidth += t228_getFullWidth(li)
        });
        if (mainContainerWidth - (maxWidth * 2 + paddingWidth * 2) > centerWidth + 20) {
            if (isDataAlignCenter) {
                if (leftSide)
                    leftSide.style.minWidth = maxWidth + 'px';
                if (rightSide)
                    rightSide.style.minWidth = maxWidth + 'px';
                if (menuList)
                    menuList.classList.remove('t228__list_hidden')
            }
        } else {
            if (leftSide)
                leftSide.style.minWidth = maxWidth + '';
            if (rightSide)
                rightSide.style.minWidth = maxWidth + ''
        }
    })
}
function t228_getFullWidth(el) {
    if (!el)
        return 0;
    var marginLeft = el.style.marginLeft || window.getComputedStyle(el).marginLeft;
    var marginRight = el.style.marginRight || window.getComputedStyle(el).marginRight;
    marginLeft = parseInt(marginLeft, 10) || 0;
    marginRight = parseInt(marginRight, 10) || 0;
    return el.offsetWidth + marginLeft + marginRight
}
function t228_getFullHeight(el) {
    if (!el)
        return 0;
    var marginTop = el.style.marginTop || window.getComputedStyle(el).marginTop;
    var marginBottom = el.style.marginBottom || window.getComputedStyle(el).marginBottom;
    marginTop = parseInt(marginTop, 10) || 0;
    marginBottom = parseInt(marginBottom, 10) || 0;
    return el.offsetHeight + marginTop + marginBottom
}
function t282_showMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t282');
    var submenu = rec.querySelector('.t-menusub__container');
    var allRec = document.getElementById('allrecords');
    var isEdit = allRec ? allRec.getAttribute('data-tilda-mode') === 'edit' : !1;
    if (isEdit && submenu) {
        submenu.style.position = 'relative';
        submenu.style.zIndex = '10';
        submenu.style.pointerEvents = 'none'
    }
    var menuLinks = rec.querySelectorAll('.t-menusub__link-item');
    var menuContainer = rec.querySelector('.t282__container');
    var menuAndOverlay = rec.querySelectorAll('.t282__menu__container, .t282__overlay');
    var canBeClickedItems = rec.querySelectorAll('.t282__burger, .t282__menu__link:not(.tooltipstered):not(.t282__menu__link_submenu), .t282__overlay');
    var menuBlock = rec.querySelector('.t282__menu__container');
    var menuWrapper = menu.querySelector('.t282__menu__wrapper');
    var menuContainerHeight = menuContainer ? menuContainer.getBoundingClientRect().height : 0;
    Array.prototype.forEach.call(canBeClickedItems, function(element) {
        element.addEventListener('click', function() {
            if (element.closest('.t282__menu__link.tooltipstered, .t794__tm-link, .t978__tm-link, .t966__tm-link'))
                return;
            document.body.classList.toggle('t282_opened');
            Array.prototype.forEach.call(menuAndOverlay, function(el) {
                el.style.transform = '';
                if (element.closest('.t282__burger') && el.closest('.t282__menu__container') && el.classList.contains('t282__closed') && !window.isMobile) {
                    el.style.pointerEvents = 'none';
                    setTimeout(function() {
                        el.style.pointerEvents = ''
                    }, 500)
                }
                var menuContainerHeight = menuContainer ? menuContainer.getBoundingClientRect().height : 0;
                if (element.closest('.t282__burger') && menuWrapper.clientHeight > menuBlock.clientHeight && !el.classList.contains('t282__closed')) {
                    el.style.transform = 'translateY(calc(-100% - ' + menuContainerHeight + 'px))'
                }
                el.classList.toggle('t282__closed')
            });
            if (menuBlock)
                menuBlock.style.top = menuContainerHeight + 'px';
            t282_highlight(recid)
        })
    });
    menu.addEventListener('clickedAnchorInTooltipMenu', function() {
        document.body.classList.remove('t282_opened');
        Array.prototype.forEach.call(menuAndOverlay, function(el) {
            el.classList.add('t282__closed')
        })
    });
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            document.body.classList.remove('t282_opened');
            Array.prototype.forEach.call(menuAndOverlay, function(el) {
                el.classList.add('t282__closed')
            })
        })
    })
}
function t282_changeSize(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t282__container');
    var menuContainer = rec.querySelector('.t282__menu__container');
    var menuWrapper = document.getElementById('nav' + recid);
    var menuHeight = menu ? menu.offsetHeight : 0;
    var menuContainerHeight = menuContainer ? menuContainer.offsetHeight : 0;
    if (menuHeight > document.documentElement.clientHeight - menuContainerHeight) {
        if (menuWrapper)
            menuWrapper.classList.add('t282__menu_static')
    } else {
        if (menuWrapper)
            menuWrapper.classList.remove('t282__menu_static')
    }
}
function t282_changeBgOpacityMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menuBlocks = rec.querySelectorAll('.t282__container__bg');
    Array.prototype.forEach.call(menuBlocks, function(menu) {
        var bgColor = menu.getAttribute('data-bgcolor-rgba');
        var bgColorAfterScroll = menu.getAttribute('data-bgcolor-rgba-afterscroll');
        var bgOpacity = menu.getAttribute('data-bgopacity');
        var bgOpacityTwo = menu.getAttribute('data-bgopacity2');
        var menuShadow = menu.getAttribute('data-menu-shadow') || '0';
        var menuShadowValue = menuShadow === '100' ? menuShadow : '0.' + menuShadow;
        menu.style.backgroundColor = window.pageYOffset > 20 ? bgColorAfterScroll : bgColor;
        if (window.pageYOffset > 20 && bgOpacityTwo === '0' || window.pageYOffset <= 20 && bgOpacity === '0.0' || menuShadow === ' ') {
            menu.style.boxShadow = 'none'
        } else {
            menu.style.boxShadow = '0px 1px 3px rgba(0,0,0,' + menuShadowValue + ')'
        }
    })
}
function t282_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    if (url.substr(url.length - 1) === '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1)
    }
    if (pathname === '') {
        pathname = '/'
    }
    var shouldBeActiveElements = document.querySelectorAll('.t282__menu a[href=\'' + url + '\'], ' + '.t282__menu a[href=\'' + url + '/\'], ' + '.t282__menu a[href=\'' + pathname + '\'], ' + '.t282__menu a[href=\'/' + pathname + '\'], ' + '.t282__menu a[href=\'' + pathname + '/\'], ' + '.t282__menu a[href=\'/' + pathname + '/\']' + (hash ? ', .t282__menu a[href=\'' + hash + '\']' : '') + (hash ? ', .t282__menu a[href=\'/' + hash + '\']' : '') + (hash ? ', .t282__menu a[href=\'' + hash + '/\']' : '') + (hash ? ', .t282__menu a[href=\'/' + hash + '/\']' : ''));
    var rec = document.getElementById('rec' + recid);
    var menuLinks = rec ? rec.querySelectorAll('.t282__menu a') : [];
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.classList.remove('t-active')
    });
    Array.prototype.forEach.call(shouldBeActiveElements, function(link) {
        link.classList.add('t-active')
    })
}
function t282_appearMenu(recid) {
    var record = document.getElementById('rec' + recid);
    var menuBlock = record.querySelector('.t282');
    var fixedMenu = menuBlock ? menuBlock.querySelector('.t282__positionfixed') : null;
    if (!fixedMenu)
        return;
    var appearOffset = menuBlock.getAttribute('data-appearoffset');
    if (appearOffset && appearOffset.indexOf('vh') !== -1) {
        appearOffset = Math.floor((window.innerHeight * (parseInt(appearOffset) / 100)))
    }
    appearOffset = parseInt(appearOffset, 10);
    var menuHeight = fixedMenu.clientHeight;
    if (typeof appearOffset === 'number' && window.pageYOffset >= appearOffset) {
        if (fixedMenu.style.transform === 'translateY(-' + menuHeight + 'px)') {
            t282_slideUpElement(fixedMenu, menuHeight, 'toBottom')
        }
    } else if (fixedMenu.style.transform === 'translateY(0px)') {
        t282_slideUpElement(fixedMenu, menuHeight, 'toTop')
    } else {
        fixedMenu.style.transform = 'translateY(-' + menuHeight + 'px)';
        fixedMenu.style.opacity = '0'
    }
}
function t282_slideUpElement(menu, menuHeight, direction) {
    var diff = direction === 'toTop' ? 0 : menuHeight;
    var diffOpacity = direction === 'toTop' ? 1 : 0;
    var timerID = setInterval(function() {
        menu.style.transform = 'translateY(-' + diff + 'px)';
        menu.style.opacity = diffOpacity.toString();
        diffOpacity = direction === 'toTop' ? diffOpacity - 0.1 : diffOpacity + 0.1;
        diff = direction === 'toTop' ? diff + (menuHeight / 20) : diff - (menuHeight / 20);
        if (direction === 'toTop' && diff >= menuHeight) {
            menu.style.transform = 'translateY(-' + menuHeight + 'px)';
            menu.style.opacity = '0';
            clearInterval(timerID)
        }
        if (direction === 'toBottom' && diff <= 0) {
            menu.style.transform = 'translateY(0px)';
            menu.style.opacity = '1';
            clearInterval(timerID)
        }
    }, 10)
}
function t452_scrollToTop() {
    var duration = 700;
    var difference = window.pageYOffset;
    var step = 10 * difference / duration;
    var timer = setInterval(function() {
        difference -= step;
        window.scrollTo(0, difference);
        document.body.setAttribute('data-scrollable', 'true');
        if (window.pageYOffset === 0) {
            document.body.removeAttribute('data-scrollable');
            clearInterval(timer)
        }
    }, 10)
}
function t270_scroll(hash, offset) {
    if (!hash)
        return;
    t270_checkLoad(hash, offset);
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0
    }
    var target;
    try {
        if (hash.substring(0, 1) === '#') {
            target = document.getElementById(hash.substring(1))
        } else {
            target = document.querySelector(hash)
        }
    } catch (event) {
        console.log('Exception t270: ' + event.message);
        return !0
    }
    if (!target) {
        target = document.querySelector('a[name="' + hash.substr(1) + '"]');
        if (!target)
            return !0
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var wrapperBlock = document.querySelector('.t270');
    var dontChangeHistory = wrapperBlock ? Boolean(wrapperBlock.getAttribute('data-history-disabled')) : !1;
    target = parseInt((target.getBoundingClientRect().top + window.pageYOffset) - offset, 10);
    target = Math.abs(target);
    if ('scrollBehavior'in document.documentElement.style) {
        t_throttle(window.scrollTo({
            left: 0,
            top: target,
            behavior: 'smooth',
        }), 500)
    } else {
        t270_scrollToEl(target)
    }
    if (!dontChangeHistory && isHistoryChangeAllowed) {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
        isHistoryChangeAllowed = !1
    }
    return !0
}
function t270_checkLoad(hash, offset) {
    if (window.t270_loadChecked)
        return;
    var sliderWrappers = document.body.querySelectorAll('.t-slds__items-wrapper');
    if (!sliderWrappers.length)
        return;
    var lastWrapper = sliderWrappers[sliderWrappers.length - 1];
    var sliderImgs = lastWrapper ? lastWrapper.querySelectorAll('.t-slds__bgimg') : [];
    var lastImg = sliderImgs[sliderImgs.length - 1];
    var imageUrl = lastImg ? window.getComputedStyle(lastImg).backgroundImage : '';
    imageUrl = imageUrl.substring(5, imageUrl.length - 2);
    var preloaderImg = document.createElement('img');
    preloaderImg.src = imageUrl ? imageUrl : '';
    preloaderImg.addEventListener('load', function() {
        t270_scroll(hash, offset);
        window.t270_loadChecked = !0
    })
}
function t270_scrollToEl(target) {
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    var bottomViewportPoint = documentHeight - document.documentElement.clientHeight;
    if (target > bottomViewportPoint)
        target = bottomViewportPoint;
    if (target === window.pageYOffset)
        return !1;
    var currentPosition = window.pageYOffset;
    var step = (target - currentPosition) / 30;
    var difference = window.pageYOffset;
    var timerID = setInterval(function() {
        difference += step;
        window.scrollTo(0, difference);
        document.body.setAttribute("data-scrollable", "true");
        if ((target - currentPosition < 0 && window.pageYOffset <= target) || (target - currentPosition > 0 && window.pageYOffset >= target)) {
            clearInterval(timerID);
            document.body.removeAttribute("data-scrollable")
        }
    }, 10)
}

// const userForm = document.getElementById('form__block');
// console.log(userForm)
// const formBtn = document.getElementById('form__button');
// console.log(formBtn)

// userForm.addEventListener('submit', function(e) {
//     e.preventDefault()
//     window.open('mailto:vitalikfedytnyk@gmail.com?subject=subject&body=body');
// })
