var SearchController = Fidel.ViewController.extend ({
  events: {
    keystroke: 'keyup input',
    hide: 'click .hide',
    select: 'click .song' 
  },
  init: function() { },
  keystroke: function(e){
    var self = this,
        query = this.searchBox.val();
    if (e.keyCode == 13) {
      services.rdio.search(query, function(data){
        self.results(data);
      });
    }
  },
  results: function(data){
    var results = data.results;
    for(i = 0, c = results.length; i < c; i++){
      this.resultsNode.append('<li class="song" data-trackkey='+ results[i].key +'>' + results[i].name + '</li>');
    }
    this.resultsNode.append('<li class="hide">Hide Results</li>');
  },
  select: function(e) {
    var trackKey = e.target.getAttribute('data-trackkey');
    this.emit('select', [trackKey]);
    this.searchBox.val('');
    this.hide();
  },
  hide: function(){
    this.resultsNode.find('li').remove();
  }
});
