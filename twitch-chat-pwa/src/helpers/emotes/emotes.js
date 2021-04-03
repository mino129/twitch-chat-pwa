const { EmoteFetcher } = require('@mkody/twitch-emoticons');

export const fetcher = new EmoteFetcher();

export async function memoiseRoomAndAddEmotes (id) {

    let room;

    room = id
    
    try {
        console.log('BTTV-Global', await fetcher.fetchBTTVEmotes(null))
    } catch (error) {
        console.log('BTTV-Global', error)
    }

    try {
        console.log('fetchTwitchEmotes-Global', await fetcher.fetchTwitchEmotes(null))
    } catch (error) {
        console.log('fetchTwitchEmotes-Global', error)
    }
    try {
        console.log('fetchTwitchEmotes-room', await fetcher.fetchTwitchEmotes(room))
    } catch (error) {
        console.log('fetchTwitchEmotes-room', error)
    }
    try {
        console.log('fetchBTTVEmotes-channel', await fetcher.fetchBTTVEmotes(id))
    } catch (error) {
        console.log('fetchBTTVEmotes-channel', error)
    }
    try {
        console.log('fetchFFZEmotes-channel', await fetcher.fetchFFZEmotes(id))
    } catch (error) {
        console.log('fetchFFZEmotes-channel', error)
    }
}

export function formatEmotes(text, emotes) {
    var splitText = text.split('');
    for(var i in emotes) {
        var e = emotes[i];
        for(var j in e) {
            var mote = e[j];
            if(typeof mote == 'string') {
                mote = mote.split('-');
                mote = [parseInt(mote[0]), parseInt(mote[1])];
                var length =  mote[1] - mote[0],
                    empty = Array.apply(null, new Array(length + 1)).map(function() { return '' });
                splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/1.0">');
            }
        }
    }
    return splitText.join('');
}