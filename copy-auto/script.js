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
