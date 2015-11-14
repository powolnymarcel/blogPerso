$(document).ready(function(){

	if(confirm('Etes vous certain ?')){
		$('.categorie_delete').click(function(evenement){
			$cible = $(evenement.target);
			$.ajax({
				type: 'DELETE',
				url:'/categories/supprimer/' + $cible.attr('data-categorie-id'),
				data : {
					_csrf : $cible.attr('data-csrf')
				},
				success: function(reponse){
					$cible.parent().parent().remove();
					alert('Categorie supprimée');
					window.location.href='/gestionnaire/categories'
				},
				error:function(erreur){
					alert(erreur);
					console.log(erreur);
				}
			})
		})
	}
});
