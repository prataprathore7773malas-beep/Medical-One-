/*========================================================
  MEDICAL ONE
  MAIN JAVASCRIPT
========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /*====================================================
      01. ELEMENT SELECTORS
    ====================================================*/

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const siteHeader =
        document.getElementById("siteHeader");

    const backToTop =
        document.getElementById("backToTop");

    const currentYear =
        document.getElementById("currentYear");

    const mainSearchBtn =
        document.getElementById("mainSearchBtn");

    const healthcareType =
        document.getElementById("healthcareType");

    const healthcareLocation =
        document.getElementById("healthcareLocation");

    const currentLocationBtn =
        document.getElementById("currentLocationBtn");

    const providerRegistrationForm =
        document.getElementById(
            "providerRegistrationForm"
        );


    /*====================================================
      02. CURRENT YEAR
    ====================================================*/

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /*====================================================
      03. MOBILE NAVIGATION
    ====================================================*/

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle(
                        "mobile-open"
                    );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                const icon =
                    menuToggle.querySelector("i");


                if (icon) {

                    icon.classList.toggle(
                        "fa-bars",
                        !isOpen
                    );

                    icon.classList.toggle(
                        "fa-xmark",
                        isOpen
                    );

                }

            }
        );


        /*----------------------------------------------
          CLOSE MOBILE MENU AFTER CLICK
        ----------------------------------------------*/

        const mobileLinks =
            mainNav.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }
            );

        });

    }


    /*====================================================
      04. HEADER SCROLL EFFECT
    ====================================================*/

    const updateHeader =
        () => {

            if (!siteHeader) {
                return;
            }


            if (window.scrollY > 20) {

                siteHeader.classList.add(
                    "scrolled"
                );

            } else {

                siteHeader.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /*====================================================
      05. SMOOTH SCROLL
    ====================================================*/

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /*====================================================
      06. FAQ ACCORDION
    ====================================================*/

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach((item) => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) {
            return;
        }


        question.addEventListener(
            "click",
            () => {

                const wasActive =
                    item.classList.contains(
                        "active"
                    );


                /*--------------------------------------
                  CLOSE ALL OTHER FAQ ITEMS
                --------------------------------------*/

                faqItems.forEach((otherItem) => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );


                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });


                /*--------------------------------------
                  OPEN SELECTED ITEM
                --------------------------------------*/

                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );


        question.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    /*====================================================
      07. BACK TO TOP
    ====================================================*/

    const updateBackToTop =
        () => {

            if (!backToTop) {
                return;
            }


            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /*====================================================
      08. MAIN HEALTHCARE SEARCH
    ====================================================*/

    if (
        mainSearchBtn &&
        healthcareType &&
        healthcareLocation
    ) {

        mainSearchBtn.addEventListener(
            "click",
            () => {

                const type =
                    healthcareType.value.trim();

                const location =
                    healthcareLocation.value.trim();


                /*--------------------------------------
                  VALIDATION
                --------------------------------------*/

                if (!type) {

                    healthcareType.focus();

                    showSearchMessage(
                        "Please select what you are looking for."
                    );

                    return;

                }


                if (!location) {

                    healthcareLocation.focus();

                    showSearchMessage(
                        "Please enter your city, area, locality or PIN code."
                    );

                    return;

                }


                /*--------------------------------------
                  SEARCH EVENT
                --------------------------------------*/

                const searchData = {

                    healthcareType: type,

                    location: location,

                    timestamp:
                        new Date().toISOString()

                };


                console.log(
                    "Medical One Search:",
                    searchData
                );


                /*
                    FUTURE BACKEND:

                    This is where the actual
                    healthcare provider search API
                    will be connected.

                    Example:

                    /search?
                    type=doctor&
                    location=jaipur

                */


                showSearchMessage(
                    "Healthcare search is ready. Provider results will appear here when the search database is connected.",
                    "success"
                );

            }
        );


        /*----------------------------------------------
          ENTER KEY SEARCH
        ----------------------------------------------*/

        healthcareLocation.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    mainSearchBtn.click();

                }

            }
        );

    }


    /*====================================================
      09. SEARCH MESSAGE
    ====================================================*/

    function showSearchMessage(
        message,
        type = "error"
    ) {

        let messageBox =
            document.getElementById(
                "searchMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );

            messageBox.id =
                "searchMessage";


            messageBox.style.position =
                "fixed";

            messageBox.style.left =
                "50%";

            messageBox.style.bottom =
                "25px";

            messageBox.style.transform =
                "translateX(-50%) translateY(20px)";

            messageBox.style.zIndex =
                "5000";

            messageBox.style.maxWidth =
                "calc(100% - 30px)";

            messageBox.style.padding =
                "13px 18px";

            messageBox.style.borderRadius =
                "10px";

            messageBox.style.fontSize =
                "12px";

            messageBox.style.fontWeight =
                "600";

            messageBox.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.18)";

            messageBox.style.opacity =
                "0";

            messageBox.style.transition =
                "all 0.3s ease";


            document.body.appendChild(
                messageBox
            );

        }


        if (type === "success") {

            messageBox.style.background =
                "#20a56d";

        } else {

            messageBox.style.background =
                "#d64545";

        }


        messageBox.style.color =
            "#ffffff";


        messageBox.textContent =
            message;


        requestAnimationFrame(() => {

            messageBox.style.opacity =
                "1";

            messageBox.style.transform =
                "translateX(-50%) translateY(0)";

        });


        clearTimeout(
            messageBox.hideTimer
        );


        messageBox.hideTimer =
            setTimeout(() => {

                messageBox.style.opacity =
                    "0";

                messageBox.style.transform =
                    "translateX(-50%) translateY(20px)";

            }, 4000);

    }


    /*====================================================
      10. CURRENT LOCATION
    ====================================================*/

    if (currentLocationBtn) {

        currentLocationBtn.addEventListener(
            "click",
            () => {

                if (!navigator.geolocation) {

                    showSearchMessage(
                        "Location detection is not supported by this browser."
                    );

                    return;

                }


                currentLocationBtn.disabled =
                    true;


                currentLocationBtn.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i>';


                navigator.geolocation.getCurrentPosition(

                    (position) => {

                        const latitude =
                            position.coords.latitude;

                        const longitude =
                            position.coords.longitude;


                        /*
                            We intentionally do not
                            send coordinates to an
                            external geocoding service.

                            Later this can be connected
                            to Google Maps / Mapbox /
                            OpenStreetMap backend.
                        */


                        healthcareLocation.value =
                            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;


                        currentLocationBtn.disabled =
                            false;


                        currentLocationBtn.innerHTML =
                            '<i class="fa-solid fa-crosshairs"></i>';


                        showSearchMessage(
                            "Current location detected.",
                            "success"
                        );

                    },


                    (error) => {

                        console.warn(
                            "Location error:",
                            error
                        );


                        currentLocationBtn.disabled =
                            false;


                        currentLocationBtn.innerHTML =
                            '<i class="fa-solid fa-crosshairs"></i>';


                        let errorMessage =
                            "Unable to detect your location.";


                        if (
                            error.code ===
                            error.PERMISSION_DENIED
                        ) {

                            errorMessage =
                                "Location permission was denied.";

                        }


                        if (
                            error.code ===
                            error.POSITION_UNAVAILABLE
                        ) {

                            errorMessage =
                                "Your location is currently unavailable.";

                        }


                        if (
                            error.code ===
                            error.TIMEOUT
                        ) {

                            errorMessage =
                                "Location request timed out.";

                        }


                        showSearchMessage(
                            errorMessage
                        );

                    },

                    {

                        enableHighAccuracy: true,

                        timeout: 10000,

                        maximumAge: 300000

                    }

                );

            }
        );

    }


    /*====================================================
      11. PROVIDER REGISTRATION FORM
    ====================================================*/

    if (providerRegistrationForm) {

        providerRegistrationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const formData =
                    new FormData(
                        providerRegistrationForm
                    );


                const providerName =
                    formData.get(
                        "providerName"
                    );


                const providerType =
                    formData.get(
                        "providerType"
                    );


                const ownerDoctorName =
                    formData.get(
                        "ownerDoctorName"
                    );


                const providerPhone =
                    formData.get(
                        "providerPhone"
                    );


                const providerEmail =
                    formData.get(
                        "providerEmail"
                    );


                /*--------------------------------------
                  BASIC VALIDATION
                --------------------------------------*/

                if (
                    !providerName ||
                    !providerName.trim()
                ) {

                    showFormMessage(
                        "Please enter the provider or business name."
                    );

                    document
                        .getElementById(
                            "providerName"
                        )
                        ?.focus();

                    return;

                }


                if (!providerType) {

                    showFormMessage(
                        "Please select the provider type."
                    );

                    document
                        .getElementById(
                            "providerType"
                        )
                        ?.focus();

                    return;

                }


                if (
                    !ownerDoctorName ||
                    !ownerDoctorName.trim()
                ) {

                    showFormMessage(
                        "Please enter the owner or doctor name."
                    );

                    document
                        .getElementById(
                            "ownerDoctorName"
                        )
                        ?.focus();

                    return;

                }


                if (
                    !providerPhone ||
                    !providerPhone.trim()
                ) {

                    showFormMessage(
                        "Please enter a phone number."
                    );

                    document
                        .getElementById(
                            "providerPhone"
                        )
                        ?.focus();

                    return;

                }


                if (
                    providerEmail &&
                    providerEmail.trim()
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            providerEmail.trim()
                        )
                    ) {

                        showFormMessage(
                            "Please enter a valid email address."
                        );

                        document
                            .getElementById(
                                "providerEmail"
                            )
                            ?.focus();

                        return;

                    }

                }


                /*--------------------------------------
                  COLLECT DATA
                --------------------------------------*/

                const providerData = {

                    providerName:
                        providerName.trim(),

                    providerType:
                        providerType,

                    ownerDoctorName:
                        ownerDoctorName.trim(),

                    qualification:
                        getValue(
                            "qualification"
                        ),

                    speciality:
                        getValue(
                            "speciality"
                        ),

                    registrationDetails:
                        getValue(
                            "registrationDetails"
                        ),

                    phone:
                        providerPhone.trim(),

                    whatsapp:
                        getValue(
                            "providerWhatsapp"
                        ),

                    email:
                        providerEmail
                            ? providerEmail.trim()
                            : "",

                    website:
                        getValue(
                            "providerWebsite"
                        ),

                    address:
                        getValue(
                            "providerAddress"
                        ),

                    state:
                        getValue(
                            "providerState"
                        ),

                    district:
                        getValue(
                            "providerDistrict"
                        ),

                    city:
                        getValue(
                            "providerCity"
                        ),

                    pin:
                        getValue(
                            "providerPin"
                        ),

                    services:
                        getValue(
                            "providerServices"
                        ),

                    facilities:
                        getValue(
                            "providerFacilities"
                        ),

                    location:
                        getValue(
                            "providerLocation"
                        ),

                    submittedAt:
                        new Date().toISOString()

                };


                console.log(
                    "Medical One Provider Registration:",
                    providerData
                );


                /*
                    FUTURE BACKEND:

                    providerData can be sent to:

                    fetch("/api/providers", {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body:
                            JSON.stringify(providerData)
                    });

                */


                showFormMessage(
                    "Provider information captured successfully. Backend submission will be connected when the provider system is ready.",
                    "success"
                );


                providerRegistrationForm.reset();

            }
        );

    }


    /*====================================================
      12. GET FORM VALUE HELPER
    ====================================================*/

    function getValue(id) {

        const element =
            document.getElementById(id);


        if (!element) {

            return "";

        }


        return element.value.trim();

    }


    /*====================================================
      13. FORM MESSAGE
    ====================================================*/

    function showFormMessage(
        message,
        type = "error"
    ) {

        let messageBox =
            document.getElementById(
                "formMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement(
                    "div"
                );

            messageBox.id =
                "formMessage";


            messageBox.style.position =
                "fixed";

            messageBox.style.left =
                "50%";

            messageBox.style.bottom =
                "25px";

            messageBox.style.zIndex =
                "5000";

            messageBox.style.maxWidth =
                "calc(100% - 30px)";

            messageBox.style.padding =
                "14px 20px";

            messageBox.style.borderRadius =
                "10px";

            messageBox.style.fontSize =
                "12px";

            messageBox.style.fontWeight =
                "600";

            messageBox.style.color =
                "#ffffff";

            messageBox.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.18)";

            messageBox.style.opacity =
                "0";

            messageBox.style.transform =
                "translate(-50%, 20px)";

            messageBox.style.transition =
                "all 0.3s ease";


            document.body.appendChild(
                messageBox
            );

        }


        messageBox.style.background =
            type === "success"
                ? "#20a56d"
                : "#d64545";


        messageBox.textContent =
            message;


        requestAnimationFrame(() => {

            messageBox.style.opacity =
                "1";

            messageBox.style.transform =
                "translate(-50%, 0)";

        });


        clearTimeout(
            messageBox.hideTimer
        );


        messageBox.hideTimer =
            setTimeout(() => {

                messageBox.style.opacity =
                    "0";

                messageBox.style.transform =
                    "translate(-50%, 20px)";

            }, 4500);

    }


    /*====================================================
      14. ACTIVE NAVIGATION ON SCROLL
    ====================================================*/

    const navigationLinks =
        document.querySelectorAll(
            ".main-nav a[href^='#']"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        navigationLinks.length &&
        sections.length
    ) {

        const sectionObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const currentId =
                                entry.target.id;


                            navigationLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    if (
                                        href ===
                                        `#${currentId}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }

                            );

                        }
                    );

                },

                {

                    root: null,

                    rootMargin:
                        "-30% 0px -60% 0px",

                    threshold: 0

                }

            );


        sections.forEach(
            (section) => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /*====================================================
      15. ESC KEY
    ====================================================*/

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            if (
                mainNav &&
                mainNav.classList.contains(
                    "mobile-open"
                )
            ) {

                mainNav.classList.remove(
                    "mobile-open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }


            faqItems.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );

        }
    );


    /*====================================================
      16. WINDOW RESIZE
    ====================================================*/

    window.addEventListener(
        "resize",
        () => {

            /*
                If user expands desktop view while
                mobile menu is open, close it cleanly.
            */

            if (
                window.innerWidth > 991 &&
                mainNav
            ) {

                mainNav.classList.remove(
                    "mobile-open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /*====================================================
      17. PREVENT EMPTY DEMO LINKS
    ====================================================*/

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                /*
                    Keep placeholder links from
                    jumping to the top of the page.
                */

                event.preventDefault();

            }
        );

    });


    /*====================================================
      18. INITIALIZATION LOG
    ====================================================*/

    console.log(
        "Medical One website initialized successfully."
    );


});
