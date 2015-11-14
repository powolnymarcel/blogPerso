//if (window.jQuery) {
//	alert('Loaded');
//} else {
//	alert('Not Loaded');
//}



	$('.categorie_delete').click(function(evenement){
			if(confirm('Etes vous certain ?')){
				$this= $(this);
				console.log($this);
				//pareil au this
				$cible = $(evenement.target);
				console.log($cible.attr('data-categorie-id'));

				$.ajax({
					type: 'DELETE',
					url:'/categories/supprimer/' + $cible.attr('data-categorie-id'),
					data : {
					_csrf : $cible.attr('data-csrf')
					},
						success: function(reponse){
							$cible.parent().parent().remove();
							window.location.href='/gestionnaire/categories'
						},
						error:function(erreur){
							alert(erreur);
							console.log(erreur);
						}
				})
			}
		})
