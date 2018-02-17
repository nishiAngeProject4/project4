const jobApp = {};

jobApp.getJobListing = () => {
    $.ajax({
        url: "https://proxy.hackeryou.com",
        method: "GET",
        dataType: "json",
        data: {
            reqUrl: "http://api.indeed.com/ads/apisearch",
            params: {
                publisher: "2117056629901044",
                v: 2,
                format: "json",
                q: "web developer",
                location: "toronto",
                co: "ca",
                limit: "3",
                pageNumber: "1"
            }
        }
    }).then(res => {
        const jobListings = res.results;
        jobApp.displayJobListings(jobListings);
    });
}; 

jobApp.displayJobListings = jobListings => {
    const job = jobListings; job.forEach(item => {
        $(".wrapper").append(`
           <div class="job">
               <h2>${item.jobtitle}</h2>
               <h3>${item.company}</h3>
               <p>${item.snippet}</p>
               <button class="jobbtn">Generate Cover Letter</button>
           </div>`);
    });
}; 

// jobApp.indeedTitle = null;
// jobApp.indeedCompany = null;

jobApp.getJobTitle = x => {
    let indeedTitle = $(x).siblings("h2").text();
    let indeedCompany = $(x).siblings("h3").text();
    textQuery = indeedTitle.replace(/\s/g, "%20");
    jobApp.jobTitleNormalize(textQuery);
    jobApp.coverLetterIntro(indeedCompany, indeedTitle);

}; 

jobApp.jobTitleNormalize = textQuery => {
    $.ajax({
        url: `http://api.dataatwork.org/v1/jobs/normalize?job_title=${textQuery}`,
        dataType: "json",
        method: "GET"
    }).then(res => {
        console.log(res[0].parent_uuid);
        const jobuuid = res[0].parent_uuid;
        jobApp.getJobuuid(jobuuid);
    });
}; 

jobApp.getJobuuid = uuid => {
    $.ajax({
        url: `http://api.dataatwork.org/v1/jobs/${uuid}/related_skills`,
        dataType: "json",
        method: "GET"
    }).then(res => {
        for (let i = 0; i < 3; i++) {
            console.log(res.skills[i].description);
        }
    });
}; 

jobApp.coverLetterIntro = (x,y) => {
    $(".companyName").text(x);
    $(".jobRole").text(y);    
};

//////////

jobApp.replaceAntonymn1 = () => {
  $.ajax({
    url: "https://api.datamuse.com/words?rel_ant=ability",
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
  });
};

jobApp.abilty = ['eager','friendly','support','respect','fit'];

jobApp.randomAbilty = optionsArray => {
  const index = Math.floor(Math.random() * optionsArray.length);
  console.log(optionsArray[index]);
  return optionsArray[index];
};

jobApp.randomAnt1 = optionsArray => {
  const index = Math.floor(Math.random() * optionsArray.length);
  return optionsArray[index];
};
jobApp.event = () => {
  function getWordFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
};

jobApp.replaceRelWord1 = () => {
  $.ajax({
    url: "https://api.datamuse.com/words?rel_ant=support",
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
  });
};

jobApp.replaceRhyme1 = () => {
  $.ajax({
    url: "https://api.datamuse.com/words?rel_rhy=confident",
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
  });
};

jobApp.replaceRhyme2 = () => {
  $.ajax({
    url: "https://api.datamuse.com/words?rel_rhy=enthusiasm",
    method: "GET",
    dataType: "json"
  }).then(res => {
    console.log(res);
  });
};


///////

jobApp.smoothScroll = () => {

    $('a[href^="#"]').on('click', function (event) {
    
        var target = $(this.getAttribute('href'));
    
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    
    });
}


jobApp.init = () => {
    jobApp.getJobListing();
    jobApp.randomAbilty(jobApp.abilty);
    jobApp.smoothScroll();
}; 

$(function () {
    jobApp.init(); $("div").on("click", ".jobbtn", function (e) {
        jobApp.getJobTitle(this); 
    });


});