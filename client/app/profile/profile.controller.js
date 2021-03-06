var module = angular.module('tc.profile.controller', [
  'tc.user.playlist.service',
]);

module.controller('ProfileController', function ($scope, UserPlaylist, favorite, user, userPlaylists) {
  $scope.user = user;
  $scope.favorite = favorite;
  $scope.userPlaylists = userPlaylists;

  $scope.createPlaylist = function () {
    if ($scope.playlist.title) {
      UserPlaylist.create({ title: $scope.playlist.title });
      delete $scope.playlist.title;
    }
  };
});
