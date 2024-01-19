function loco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
    });
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

loco();

function navAnim(){
    gsap.to("#nav-cont svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            duration: "1",
            scrub: true
        }
    });
    
    gsap.to("#nav #nav-inner #links", {
        transform: "translateY(-200%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top -35%",
            end: "top -40%",
            duration: "1.3",
            delay: ".3",
            scrub: true
        }
    });
}


function vid_con_anim() {
    play = document.querySelector("#video-container #play")
    var vid_con = document.querySelector("#video-container")

vid_con.addEventListener("mouseenter", function() {
    gsap.to(play, {
        opacity: 1,
        scale: 1,
        duration: .7
    })
})

vid_con.addEventListener("mousemove", function(dets) {
    gsap.to(play, {
        left: dets.clientX - 50,
        top: dets.clientY - 80
    })
})


vid_con.addEventListener("mouseleave", function() {
    gsap.to(play, {
        opacity: 0,
        scale: 0,
        duration: .7
    })
})


}

function loadingAnimation() {
    var tl = gsap.timeline()
    tl.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: .5,
        duration: .9,
        stagger: .2
    })
    tl.from("#page1 #video-container", {
        scale: .9,
        opacity: 0,
        delay: .2,
        duration: .4
    })
}

function mouseAnim(){
    document.addEventListener("mousemove", function(dets) {
        gsap.to("#crsr", {
            left: dets.clientX,
            top: dets.clientY
        })
    })


    var child = document.querySelectorAll(".child")
    child.forEach((elem)=>{
        elem.addEventListener("mouseenter", function() {
            gsap.to("#crsr", {
                transform: 'translate(-50%, -50%) scale(1)'
            })
        })
    
        elem.addEventListener("mouseleave", function() {
            gsap.to("#crsr", {
                transform: 'translate(-50%, -50%) scale(0)'
            })
        })
    })
}

navAnim();
vid_con_anim();
loadingAnimation();
mouseAnim();