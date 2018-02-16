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

jobApp.getJobTitle = x => {
    let text = $(x)
        .siblings("h2")
        .text();
    console.log(text);
    text = text.replace(/\s/g, "%20");
    console.log(text);
    jobApp.jobTitleNormalize(text);
}; 

jobApp.jobTitleNormalize = text => {
    $.ajax({
        url: `http://api.dataatwork.org/v1/jobs/normalize?job_title=${text}`,
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


jobApp.init = () => {
    jobApp.getJobListing();
}; 

$(function () {
    jobApp.init(); $("div").on("click", ".jobbtn", function (e) {
        jobApp.getJobTitle(this);    // var text = $(this).siblings('h2').text();
        // console.log(text);
    });
});