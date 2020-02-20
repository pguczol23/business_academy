$(function () {

    // let mobileMenu = reRenderMobileMneu($('.mobile-menu'));

    function reRenderMobileMneu(mobileMenu) {
        let mobileMenuVal = mobileMenu[0].innerHTML;
        let mMenu = document.createElement('div');
        mMenu.className = 'mobile-menu';
        mMenu.innerHTML = mobileMenuVal;
        document.body.append(mMenu);
        mobileMenu.remove();
        return $('.mobile-menu');
    }

    function toggleMenu(el) {
        let menu = $(el);
        let html = $('html');
        let mBtn = $('.mobile-menu-btn .animated-icon');
        if (menu.css('right') >= '0px' || menu.css('right') >= 0) {
            menu.animate({right: '-9999px'});
            mBtn.removeClass('open');
            html.removeClass('no-scroll');
        }else {
            menu.animate({right: '0'});
            mBtn.addClass('open');
            html.addClass('no-scroll');
        }
    }

    let productDetailSwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoHeight: !0,
        loop: !1,
        centeredSlides: true,
        allowTouchMove: true,
        passiveListeners: false,
        simulateTouch: true,
        touchStartPreventDefault: false,
        followFinger: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    let mobileInit = false;

    // fix vertical height swiper sliders
    const swiperFix = (els) => {
        let count = 1;
        let swiperIntervalId = setInterval(function () {
            Array.prototype.forEach.call(els, (v) => {
                v.update();
            });
            if (count >= 3) {
                clearInterval(swiperIntervalId);
            }
            count++;
        }, 500);
    };

    let Swipers = [];

    const onResizeFn = () => {
        if (window.innerWidth <= 576 && !mobileInit) {

            if (reviewsSwiper) reviewsSwiper.destroy();
            if (sertificatsSwiper) sertificatsSwiper.destroy();

            let mobileSwipers = $('.swiper-container-init-mobile');

            $.each(mobileSwipers, (k,v) => {
                v = $(v);
                let pagination = v.closest('.section-content').find('.swiper-pagination');
                let type = v.attr('data-swiper-type') || null;
                let slidesPerGroup = 1;

                if (type === 'client') {
                    slidesPerGroup = 9;
                }

                let elsHide = null;
                let elsShow = null;

                let mobileSwiper = new Swiper(v, {
                    direction: 'horizontal',
                    autoHeight: !0,
                    loop: !1,
                    centeredSlides: true,
                    allowTouchMove: true,
                    passiveListeners: false,
                    simulateTouch: true,
                    touchStartPreventDefault: false,
                    followFinger: false,
                    slidesPerView: 1,
                    spaceBetween: 60,
                    slidesPerGroup: slidesPerGroup,
                    calculateHeight: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: pagination || '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                    on: {
                        init: function () {
                            this.type = type;
                            this.currentSlide = 0;

                            switch (this.type) {
                                case "client" : {
                                    let elMultiplier = 9;
                                    let els = $(this.el).find('.swiper-slide');
                                    let curSlide = this.currentSlide;

                                    if (this.currentSlide <= 0) {
                                        curSlide = 1;
                                    }
                                    let offset = curSlide * elMultiplier;
                                    let from = this.currentSlide * elMultiplier;
                                    let offsetE = els.slice(from,offset);

                                    if (offsetE.length === 0) {
                                        offsetE = els.slice(offset);
                                    }
                                    elsHide = els;
                                    elsShow = offsetE;
                                }
                                default: return;
                            }

                        },
                        slideChangeTransitionStart: function() {
                            switch (this.type) {
                                case "review" : {
                                    let el = $(this.$el).find('.swiper-slide-active');

                                    let more = el.find('.more');
                                    let moreText = more.find('.text');

                                    let detail = $('.review-detail');
                                    let text = detail.find('.text');

                                    text.html(moreText.html());

                                    return;
                                }
                                case "client" : {
                                    console.log(this.currentSlide);
                                }
                                default: return;
                            }
                        },
                        slideNextTransitionStart: function () {
                            this.currentSlide++;

                            switch (this.type) {
                                case "client" : {
                                    slidesSlice(this.el, 'next');
                                }
                                default: return;
                            }
                        },
                        slidePrevTransitionStart: function () {
                            this.currentSlide--;

                            switch (this.type) {
                                case "client" : {
                                    slidesSlice(this.el, 'next');
                                }
                                default: return;
                            }
                        },
                    }
                });
                try {
                    $(elsHide).addClass('hide');
                    $(elsShow).removeClass('hide');
                }catch (e) {

                }
                Swipers.push(mobileSwiper);
            });
            swiperFix(Swipers);
            mobileInit = true;
        }else {
            if (mobileInit) {
                mobileInit = false;
                Array.prototype.forEach.call(Swipers, v => {
                    v.destroy();
                });
                Swipers = [];
                swipersInit();
            }
        }
    };
    window.onresize = onResizeFn;


    let reviewsSwiper,sertificatsSwiper;
    const swipersInit = () => {
        if (window.innerWidth <= 576) {
            onResizeFn();
            return;
        }

        reviewsSwiper = new Swiper('.swiper-container-reviews', {
            spaceBetween: 20,
            direction: 'horizontal',
            autoHeight: !0,
            loop: !1,
            centeredSlides: false,
            // freeMode: false,
            slidesPerView: 5,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
            }
        });

        sertificatsSwiper = new Swiper('.swiper-container-sertificat', {
            direction: 'horizontal',
            autoHeight: !0,
            loop: !1,
            centeredSlides: false,
            allowTouchMove: true,
            passiveListeners: false,
            simulateTouch: true,
            touchStartPreventDefault: false,
            followFinger: false,
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1500: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                577: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                }
            }
        });
    };
    swipersInit();

    const slidesSlice = (el, type) => {
        let elMultiplier = 9;
        let els = $(el).find('.swiper-slide');
        let curSlide = this.currentSlide;
        if (this.currentSlide <= 0) {
            curSlide = 1;
        }
        let offset = curSlide * elMultiplier;
        let from = this.currentSlide * elMultiplier;
        let offsetE = undefined;
        if (type === 'next') {
            offsetE = els.slice(from, offset + elMultiplier);
        }else {
            offsetE = els.slice(from,offset-elMultiplier);
        }
        if (offsetE.length === 0) {
            offsetE = els.slice(offset);
        }
        if (type === 'next') {
            $(els).addClass('hide');
            $(offsetE).removeClass('hide');
        }else {
            $(els).removeClass('hide');
            $(offsetE).addClass('hide');
        }
    };

    $('.swiper-container-reviews .swiper-slide').on('click', function () {
        let el = $(this);
        let detail = $('.review-detail');
        let img = detail.find('.image img');
        let text = detail.find('.text');

        let more = el.find('.more');
        let moreImg = more.find('img');
        let moreText = more.find('.text');

        img.attr('src', moreImg.attr('src'));
        text.html(moreText.html());

        let viewer = new Viewer(img[0], {
            keyboard: false,
            movable: false,
            navbar: false,
            rotatable: false,
            scaleble: true,
            slideOnTouch: false,
            toggleOnDblclick: true,
            toolbar: false,
            tooltip: false,
            zoomable: true,
            zoomOnTouch: false,
            zoomOnWheel: true,
        });
    });

    // let sw = new Swiper('.swiper-container-init-mobile2', {
    //     direction: 'horizontal',
    //     autoHeight: !0,
    //     loop: !1,
    //     centeredSlides: true,
    //     allowTouchMove: true,
    //     passiveListeners: false,
    //     simulateTouch: true,
    //     touchStartPreventDefault: false,
    //     followFinger: false,
    //     slidesPerView: 9,
    //     slidesPerGroup: 9,
    //     spaceBetween: 0,
    //     calculateHeight: true,
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     }
    // });
    // let items = $('.clients-swiper-container .item');
    // items.hide();
    // for (let i = 0;i<9;i++) {
    //     $(items[i]).css('display', 'flex');
    // }

    $.each($('.sertificat-slide'), function (k, v) {
        let el = $(this).find('img')[0];
        let viewer = new Viewer(el, {
            keyboard: false,
            movable: false,
            navbar: false,
            rotatable: false,
            scaleble: true,
            slideOnTouch: false,
            toggleOnDblclick: true,
            toolbar: false,
            tooltip: false,
            zoomable: true,
            zoomOnTouch: false,
            zoomOnWheel: true,
        });
    });

    let clients = $('.clients-container .item');
    let clientsCnt = clients.length;


    window.submenu = {
        menu: null,
        subMenus: null,
        init: () => {
          let e = window.submenu;
          e.menu = $('.has-submenu');
          if (e.menu.length <= 0) {
              return;
          }
          e.subMenus = $('.has-submenu .submenu');

          e.menu.unbind('mouseover');
          e.menu.unbind('mouseleave');
          e.subMenus.unbind('mouseleave');

          e.menu.on('mouseover', function () {
              let submenu = $(this).find('.submenu');
              submenu.show();
          });
          e.menu.on('mouseleave', function () {
              let submenu = $(this).find('.submenu');
              if (submenu.css('display') == "block") {
                  submenu.hide();
              }
          });
          e.subMenus.on('mouseleave', () => {
              $(this).hide();
          });
        }
    };

    window.itemsFilter = {
        filter: null,
        swiperType: "filter",
        init: () => {
            let e = window.itemsFilter;
            e.filter = $('[data-filter]');
            if (e.filter.length <= 0) {
                return;
            }
            Array.prototype.forEach.call(e.filter, function (v) {
                v = $(v);
                let filterKeys = v.find('[data-filter-key]');
                let filterItemsContainer = $(v.attr('data-filter-items'));
                let filterItems = filterItemsContainer.find(".item");
                let select = v.find('select');

                select.unbind('select');
                filterKeys.unbind('click');

                if (window.innerWidth <= 576) {
                    select.on('change', function () {
                        let el = select.find('option:selected');
                        let key = el.attr('data-filter-key');

                        e.filterItems('select', filterKeys, key, filterItems, filterItemsContainer, el);
                    });
                }else {
                    filterKeys.on('click', function () {
                        let el = $(this);
                        let key = el.attr('data-filter-key');

                        e.filterItems('click', filterKeys, key, filterItems, filterItemsContainer, el);
                    });
                }
            });
        },
        update: () => {
            let e = window.itemsFilter;
            if (Swipers.length <= 0 || window.innerWidth > 576) return;
            Array.prototype.forEach.call(Swipers, function (v) {
                if (v.type === e.swiperType) {
                    v.update();
                }
            });
        },
        filterItems: (type, keys, key, items, container, el=null) => {
            let e = window.itemsFilter;
            console.log(type,type === 'click');

            if (type === 'click') {
                if (el.hasClass('active')) {
                    key = 0;
                    keys.removeClass('active');
                }else {
                    keys.removeClass('active');
                    el.addClass('active');
                }
            }

            if (key == 0 || key == 'all') {
                items.css('display', 'flex');
                e.update();
                return;
            }

            items.hide();
            let filtered = container.find('[data-fkey="' + key + '"]');
            filtered.css('display','flex');
            e.update();
        }
    };

    window.submenu.init();
    window.itemsFilter.init();

});