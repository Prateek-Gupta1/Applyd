(function(){

//Listen to incoming requests to scan job info.
chrome.runtime.onMessage.addListener(function(msg, sender, response){
   if(msg.from === 'applyd_popup' && msg.subject === 'scanInfo'){
      var jobInfo = scanJobInfo(msg.url);
      response(jobInfo);
   }
});

function scanJobInfo(url){
   var jobInfo = {};
   if(url.indexOf('linkedin') != -1){
      jobInfo = scanLinkedInPage();
   }else if( url.indexOf('indeed') != -1){
      jobInfo = scanIndeedPage();
   }
   return jobInfo;
}

function scanLinkedInPage(){
   jobInfo = {};
   jobInfo.jobTitle = $('.jobs-details-top-card__job-title').text().trim();
   jobInfo.company = $('.jobs-details-top-card__company-info a').text().trim();
   jobInfo.location = $('.jobs-details-top-card__bullet').first().text().trim();

   var now = new Date();
   var day = ("0" + now.getDate()).slice(-2);
   var month = ("0" + (now.getMonth() + 1)).slice(-2);
   var today = now.getFullYear()+"-"+(month)+"-"+(day);
   jobInfo.date = today;

   jobInfo.description = "";
   $('.jobs-box__html-content.jobs-description-content__text')
      .contents()
      .filter(function(){
         if(this.nodeType === 3){
            jobInfo.description += this.textContent.indexOf('undefined') === -1 ? this.textContent : "";
         }else if(this.nodeType === 1){
            $(this).contents()
            .filter(function(){
               //if(this.nodeType === 1){
                  jobInfo.description += this.textContent.indexOf('undefined') === -1 ? this.textContent : "";
              // }
            })
         }
      })
   return jobInfo;
}

function scanIndeedPage(){

}

}());