'click .namegenerator': function(){
  current_name = names[Math.floor(Math.random()*childnameList.length)].childnamelist;
  console.log(current_name);
  $(".name_holder").html(current_name);
})

$( document ).ready(function() {
    console.log( "ready!" );
    var current_name;
    var names;
    $.getJSON( "/names.json", function( data ) {
      names = data;
    });
    $(".name_generator").click(function(e){
      console.log("botton_clicked");
      current_name = names[Math.floor(Math.random()*names.length)].name + " " + $(".last_name").val();
      console.log(current_name);
      $(".name_holder").html(current_name);
    })
});
