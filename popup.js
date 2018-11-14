// Update the relevant fields with the new data
(function(){
  var jobInfo = {}

  function setDOMInfo(info) {
    console.log(info);
    if(info !== undefined && info !== null && !$.isEmptyObject(info)) {
      $('#company').val(info.company);
      $('#jobTitle').val(info.jobTitle);
      $('#location').val(info.location);
      $('#description').val(info.description.trim());
      $('#date').val(info.date);
      jobInfo = info;
    }
  }
 
 // message the contentscript (scan.js) to scan the page and set the fields.
  function sendScanRequest(){
  // ...query for the active tab...
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        // ...and send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'applyd_popup', subject: 'scanInfo', url: tabs[0].url},
            // ...also specifying a callback to be called 
            //    from the receiving end (content script)
            setDOMInfo)
      });
  }

  function storeJobInfo(job){
    chrome.runtime.sendMessage({from: 'applyd_popup', subject: 'storeJobInfo', job: job}, function(res){
      console.log(res);
    });
  }
  
  // Once the DOM is ready...
  window.addEventListener('DOMContentLoaded', function () {
    // add listener on button to store the job details...
    $(document).ready(function(){
      $('#success_anime').hide();
      $('#saveButton').click(function(){
        storeJobInfo(jobInfo);
        $('#content').hide('fast', 'linear', function(){
          $('#success_anime').show('slow');
        });
      });
      $('#showButton').click(function(){
        chrome.windows.create({
          url: chrome.runtime.getURL('jobs.html'),
          type: 'normal'
        })
      });
    })
    // ask content script to scan and send the job details... 
    sendScanRequest();
  });

}());