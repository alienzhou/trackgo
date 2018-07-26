(function () {
    var watcher = trackgo.watch('click');
    var store = watcher.storage;

    setInterval(function () {
        var tracks = store.storage.getAll();
        tracks && tracks.length > 0 && console.log(tracks);
    }, 5000)
})();