define(function () {
  'use strict';

  var SeriesController = function ($q, $scope,$modal, $location, $series) {

  	    $scope.offset = 0;
  	         $series.getShowsFromExtension();


  	         var services = {
      series: $series.getFeeds(),
      shows: $series.getSeries()
    };

    $q.all(services).then(function (services) {
      $scope.series = services.series;
      $scope.shows = services.shows;
    });

 	var closeModal = function ($event) {

        return $scope.welcomeModal.hide();
      };

      var followLink = function ($event) {
        $event.preventDefault();

        closeModal().then(function () {
          $location.url(angular.element($event.srcElement).attr('href'));
        });
      };

      $scope.viewShow = function (show) {
      	       $scope.welcomeModal;

    	$scope.welcomeModal = $modal({
          templateUrl: 'app/series/welcome-modal.html'
        });

      $scope.welcomeModal.show({
          name: show.name,
          description: show.description,
          closeModal: closeModal,
          test: $scope,
          followLink: followLink,
          people: [
    {name: "Bob", gender: "Male", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis nisi quis mi tincidunt luctus ut quis nunc. Nam non risus tincidunt risus sodales condimentum. Morbi sed gravida elit. Nunc a turpis vestibulum elit posuere blandit. Phasellus luctus lectus non porta auctor. Etiam pellentesque imperdiet posuere. Nullam adipiscing congue nisl, in vulputate odio ornare ac."},
    {name: "Jane", gender: "Female", details: "Maecenas quis sodales lectus, vitae convallis ipsum. Ut ac viverra tellus. Quisque vulputate, orci placerat eleifend scelerisque, eros nunc rutrum odio, pharetra mattis leo neque vel eros. Cras id purus nec lorem vehicula rutrum a vel arcu. Quisque eget euismod augue. Integer volutpat auctor lorem, quis lacinia nisl tempus nec. Nunc fringilla, odio eget molestie varius, tortor turpis dignissim lacus, sed varius nunc velit eu turpis. Etiam sed congue diam. In ornare elit nec dolor faucibus ornare. Ut eget erat vel elit tristique iaculis. Maecenas et semper lorem. Nam mollis ante et ipsum vestibulum posuere. Ut non purus non risus tempor vulputate et vitae ipsum. Mauris et sem sit amet quam pulvinar fringilla."},
    {name: "Bill", gender: "Male", details: "Quisque rhoncus scelerisque sapien, tempor vestibulum dui tincidunt eu. Maecenas scelerisque, dolor sed vehicula pulvinar, ligula erat ornare arcu, in dictum ipsum libero vel est. Donec porttitor venenatis lacus, a laoreet orci. Proin quam mi, ultrices in ullamcorper vel, malesuada suscipit lectus. Nam faucibus commodo quam, auctor vehicula felis condimentum quis. Phasellus tempor molestie enim, at vehicula justo auctor eu. Pellentesque venenatis elit eu malesuada fringilla."}
  ]
        });


    };


    $scope.updateSubscriptions = function () {
      $series.setFeeds($scope.shows);
    };


    $scope.sortCountry = function () {

    //     $('.menulist li.current').removeClass('current');
    // $(this).parent().addClass('current');
    
    // // setup heading
    // $('h1.gheading').text($(this).text());
    // //filter gallery
    // var category = $(this).text().toLowerCase().replace(' ','-');
    // console.log(category)
    // //Remove hidden class if 'all-projects' is selected
    // if(category == 'all'){
    //   $('ul#gallery li:hidden').fadeIn(500, 'linear').removeClass('hidden');
    // }else{
    //   $('ul#gallery li').each(function(){
    //     if(!$(this).hasClass(category)){
    //       $(this).hide().addClass('hidden');
    //     }else{
    //       $(this).fadeIn(500, 'linear').removeClass('hidden');
    //     }
    //   });
    // }
    // // stop link behaviour
    // return false

    };


  };

  return [
  	'$q',
    '$scope',
     '$modal',
     '$location',
     '$series',
    SeriesController
  ];
});
