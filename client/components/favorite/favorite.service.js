var module = angular.module('tc.favorite.service', []);

module.factory('Favorite', function ($http, API_BASE) {
  var data = {};
  return {
    list: function () {
      return $http.get(API_BASE + '/api/users/favorites').then(function (res) {
        data.podcasts = res.data.podcasts;
        data.playlists = res.data.playlists;
        data.stations = res.data.stations;

        data.idMap = Object.create(null);
        data.playlists.forEach(function(playlist) {
          data.idMap[playlist._id] = true;
        });
        data.podcasts.forEach(function(podcast) {
          data.idMap[podcast._id] = true;
        });
        data.stations.forEach(function(station) {
          data.idMap[station._id] = true;
        });
        return data;
      });
    },
    toggle: function (type, id) {
      if (!(id in data.idMap)) {
        return $http.post(API_BASE + '/api/favorites', {from: type, localField: id})
          .then(function (res) {
            data[type].push(res.data);
            data.idMap[res.data._id] = true;
          });
      } else {
        return $http.delete(API_BASE + '/api/users/favorites/' + type + '/' + id)
          .then(function () {
            _.pullAllBy(data[type], id);
            delete data.idMap[id];
          });
      }
    },
    check: function (id) {
      return id in data.idMap;
    },
    data: data
  };
});
