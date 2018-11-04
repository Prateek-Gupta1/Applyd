(function(){
   $(document).ready(function(){
      console.log("hello from jobs.js");
      var main = chrome.extension.getBackgroundPage();
      var jobs = main.jobMng.getAllApplied();
      console.log(jobs);
      var tbod = ''
      $.each(jobs, function(i, job){
         tbod += '<tr><td colspan="1">' + (i+1) + '</td><td colspan="2">' + job.company + '</td><td  colspan="2">' + job.jobTitle + 
            '</td><td  colspan="2">' + job.location + '</td><td  colspan="2" width="15%">' + job.date + 
            '</td><td colspan="3" width=40%><textarea name="desc" rows="5" style="min-width: 100%">' + job.description + '</textarea></td><tr>';
      });
      $("#tbody").append(tbod);
   });
}());