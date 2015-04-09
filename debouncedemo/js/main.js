$(function(){
  var key= "\\m/ "
  var myothervar = _.debounce(addthis, 2000);
 

  $('.box').on('click',function(){

    addthis('withoutdebounce',key);
    myothervar('debounce',key);
  });

   function addthis(id,xyz){
    $('#'+id).append(key);
  }
});