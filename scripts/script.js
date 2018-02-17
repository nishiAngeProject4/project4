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

jobApp.abilty = ["eager", "friendly", "support", "respect", "fit"];

jobApp.randomAbilty = optionsArray => {
  const index = Math.floor(Math.random() * optionsArray.length);
  console.log(optionsArray[index]);
  return optionsArray[index];
};

//////////

jobApp.replaceAntonymn = (query) => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_ant=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    // console.log(res);
    const anton = res; 
    jobApp.randomAnt(anton);
    jobApp.randomAnt2(anton);
    jobApp.randomAnt3(anton);
  });
};

jobApp.randomAnt = (anton) => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $('.ability').text(anton[index].word);
};

jobApp.randomAnt2 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antonymn").text(anton[index].word);
};

jobApp.randomAnt3 = anton => {
  const index = Math.floor(Math.random() * anton.length);
  console.log(anton[index].word);
  $(".antonymn2").text(anton[index].word);
};



jobApp.replaceRhyme = (query) => {
  $.ajax({
    url: `https://api.datamuse.com/words?rel_rhy=${query}`,
    method: "GET",
    dataType: "json"
  }).then(res => {
    const rhyme = res;
    jobApp.randomRhyme(rhyme);
    jobApp.randomRhyme2(rhyme);
  });
};



jobApp.randomRhyme = (rhyme) => {
  const index = Math.floor(Math.random() * rhyme.length);
  console.log(rhyme[index].word);
  $('.rhyme').text(rhyme[index].word);
};

jobApp.randomRhyme2 = rhyme => {
  const index = Math.floor(Math.random() * rhyme.length);
  console.log(rhyme[index].word);
  $(".rhymen").text(rhyme[index].word);
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
    jobApp.init(); 
    $("div").on("click", ".jobbtn", function (e) {
    jobApp.getJobTitle(this); 
});

    $("input[type=checkbox]").on("change", function(e) {
    if ($("input[type=checkbox]:checked").length > 5) {
        $(this).prop("checked", false);
        alert("allowed only 5");
    }
    });

    
    $('form').on("submit", function(e){
        e.preventDefault();
        let searchIDs = $("input:checked").map(function() {
          return $(this).val();
        });
        console.log(searchIDs.get());
        console.log(searchIDs[1]);
        jobApp.replaceAntonymn(searchIDs[0]);
        jobApp.replaceAntonymn(searchIDs[1]);
        jobApp.replaceRhyme(searchIDs[2]);
        jobApp.replaceRhyme(searchIDs[3]);
        jobApp.replaceAntonymn(searchIDs[4]);
    });

    

});