function commandReference(){var $groups=$("#card-id a")

$groups.click(function(){window.location.hash=this.getAttribute("href").substring(1)

filterCommandReference()

return false})

var filter=document.querySelector('.command-reference-filter');filter.addEventListener('change',function(e){window.location.hash=e.target.value;});window.onhashchange=function(){filterCommandReference();}}

function filterCommandReference(){var $commands=$(".container .row")

var group=window.location.hash.substring(1) // set url before anchaor tag

if(group.length==0){$commands.children().show()} // show initlal results of card

else{$commands.find("div[data-group='"+group+"']").show() // if card isn't showed show results that match data-group

$commands.find("div[data-group!='"+group+"']").hide()}

var $groups=$(".container .row")

$groups.removeClass("current")

$groups.filter("[href='#"+group+"']").addClass("current")

document.querySelector('.command-reference-filter').value=group;}



function searchCommandReference(){var $commands=$('div.container.row')

$('.js-command-reference-search').bind('input',function(ev){window.location.hash='';if(ev.keyCode===13){var name=$commands.filter(':visible')[0].getAttribute('data-name');window.location='/commands/'+name.replace(/ /g,'-');return;}

var val=$(this).val().toLowerCase().replace(/[^a-z0-9 ]/g,'');if(val===''){$commands.show()}else{$commands.hide()

$('div.container.row[data-name*="'+val+'"]').show()}})}
