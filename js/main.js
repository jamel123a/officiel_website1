
/* - -------- navigation menu ---------- */
(()=>{

    const hamburgerBtn=document.querySelector(".hamburger-btn"),
    navMenu=document.querySelector(".nav-menu"),
    closeNavBtn=document.querySelector(".close-nav-menu");


    hamburgerBtn.addEventListener("click",showNavMenu);
    closeNavBtn.addEventListener("click" ,hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
 /// attach and even headler to document 

    document.addEventListener("click",(event)=>{
       if(event.target.classList.contains('link-item')){
            /* make sure event .target .hash has a value before overridiing default hehavore */
            if(event.target.hash !==""){
                // prevent default anshor click behavor 
                event.preventDefault();
                const hash =event.target.hash;
                // deactivate exinting active 'section
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate nex section 
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");           
               navMenu.querySelector(".active").classList.remove("active","inner-shadow");
               
               
               if (navMenu.classList.contains("open")){
                //activate new navigation menu 'link-item'
                event.target.classList.add("active","inner-shadow");
                event.target.classList.remove("outer-shadow","hover-in-shadow");
                // hide navigation nemu
                hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if (hash === item.hash){
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow"); 
                        }
                    })
                    fadeOutEffect();
                }
                // add hash # to url 
                window.location.hash =hash;
            }
        }
       
    })

})();





/*   about section tabs  */
(()=>{
    const aboutSection =document.querySelector(".about-section"),
    tabsContrainer =document.querySelector(".about-tabs");

    tabsContrainer.addEventListener("click",(event)=>{

        if (event.target.classList.contains("tab-item")&&
        !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");

            tabsContrainer.querySelector(".active").classList.remove("outer-shadow","active");

            event.target.classList.add("active","outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

    function bodyScrollingToggle(){
        document.body.classList.toggle("hideen-scrolling")
    }

 /* ----------------- portfolio filter and popup-------------*/
 (()=>{
   const filterContainner=document.querySelector(".portfolio-filter"),
   portfolioIteamsContainer = document.querySelector(".portfolio-items"),
   portfolioItems=document.querySelectorAll(".portfolio-item"),
   popup=document.querySelector(".portfolio-popup"),
   prevBtn=popup.querySelector(".pp-prec"),
   nextBtn=popup.querySelector(".pp-next"),
   closeBtn=popup.querySelector(".pp-close"),
   projectDetailsContainer=popup.querySelector(".pp-details"),
   projectDetailsBtn=popup.querySelector(".pp-project-details-btn");
   let itemIndex,sildeIndex,screenshots;

  /*filter portfolio items */

  filterContainner.addEventListener("click",(event)=>{
      if (event.target.classList.contains("filter-item")&&
      !event.target.classList.contains("active")){
      // desctivate existing active filter-item 
      filterContainner.querySelector(".active").classList.remove("outer-shadow", "active");
      // active new filter items
      event.target.classList.add("active","outer-shadow");
      const target =event.target.getAttribute("data-target");
      portfolioItems.forEach((item)=>{
        if(target === item.getAttribute("data-category") || target === 'all'){
            item.classList.remove("hide");
            item.classList.add("show");
        }
        else{
            item.classList.remove("show");
            item.classList.add("hide");
        }
      })
    }
  })
  portfolioIteamsContainer.addEventListener("click",(event)=>{
  //   console.log(event.target.closest(".portfolio-item-inner"));
  if(event.target.closest(".portfolio-item-inner")){
    const portfolioItem =event.target.closest(".portfolio-item-inner"). parentElement;
    // get the portfolioitemas index
    itemIndex =Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem);
        screenshots= portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-sreenshots");
         // couvert sreenshots into array
        screenshots =screenshots.split(",");
        if(screenshots.length === 1){
            prevBtn.style.dispaly="none"
            nextBtn.style.dispaly="none"
        }
        else{
            prevBtn.style.dispaly="block"
            nextBtn.style.dispaly="block"
        }
        sildeIndex = 0;
        popupToggle();
        popupSolideShow();
        popupDetails();

    }
  })
  closeBtn.addEventListener("click",()=>{
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")){
        popupDetailsToggle();
    }
  })
  function  popupToggle(){
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSolideShow(){
      const imgSrc= screenshots[sildeIndex];
      const popupImg=popup.querySelector(".pp-img");
      popup.querySelector(".pp-loader").classList.add("active");
      popupImg.src=imgSrc;
      popupImg.onload = () =>{
        popup.querySelector(".pp-loader").classList.remove("active");  
      }
    popup.querySelector(".pp-counter").innerHTML=(sildeIndex+1)+ " of "+screenshots.length;
  }
  // next slide
  nextBtn.addEventListener("click",()=>{
   if (sildeIndex === screenshots.length-1){
       sildeIndex=0;
   }else  {
       sildeIndex++;
   }popupSolideShow();

  })
  // prev slide
  prevBtn.addEventListener("click",()=>{
      if(sildeIndex === 0){
          sildeIndex = screenshots.length-1
      }else{
          sildeIndex--;
      }
      popupSolideShow();

  })
  function popupDetails(){
     // if portfolio item daitails not excites 
      if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
        projectDetailsBtn.style.dispaly="none";
        console.log("vrai");
        return ;// end fonction
      }
      console.log("faux");
      projectDetailsBtn.style.dispaly="block";
      // get the progect details
      const details =portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
       // set the project details
      popup.querySelector(".pp-project-details").innerHTML =details;
      const title=portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
      // set  the progect title 
      popup.querySelector(".pp-title h2").innerHTML=title;
      // get the progect category 
      const category=portfolioItems[itemIndex].getAttribute("data-category");
      // set the progect category
      popup.querySelector(".pp-project-category").innerHTML=category.split("-").join(" ");

    }



  projectDetailsBtn.addEventListener("click",()=>{
      popupDetailsToggle();
  })
  function popupDetailsToggle(){
      if(projectDetailsContainer.classList.contains("active")){
        
        projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
        projectDetailsBtn.querySelector("i").classList.add("fa-plus");
       
        projectDetailsContainer.classList.remove("active");
        projectDetailsContainer.style.maxHeight= 0 + "px"

      }
      else{
       projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
        projectDetailsBtn.querySelector("i").classList.add("fa-minus");

        projectDetailsContainer.classList.add("active");
        projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight+ "px";
        popup.scrollTo(0,projectDetailsContainer.offsetTop);
      }

  }
 })();



 // hide all section expect active
            (()=>{

           const sections =document.querySelectorAll(".section");
                sections.forEach((section)=>{
                  if(!section.classList.contains("active")){
                        section.classList.add("hide");
                    }
                })
            })();

           window.addEventListener("load",() =>{
                document.querySelector(".preloader").classList.add("fade-out");
                setTimeout(()=>{
                    document.querySelector(".preloader").style.dispaly="none";
                },600)
            })