//↓↓↓モジュールの読み込み
import { Player } from "textalive-app-api";

//↓↓↓オブジェクトを新しく複製,トークン発行,音楽メディアの配置先指定
const player=new Player({
    app:{
        token:"tyWnA66OlbExv3iD",
    },

    mediaElement:document.querySelector("#media"),
});

//↓↓↓イベントリスナの登録(?いまいち理解していない)
player.addListener({
  //↓↓↓アプリがホストと接続されたら
  onAppReady: (app) => {
    //↓↓↓アプリのデバッガーのページと接続しているか(?)
    if (!app.managed) {
      //↓↓↓曲情報の読み込み
      // Loading Memories / せきこみごはん feat. 初音ミク
      player.createFromSongUrl("https://piapro.jp/t/RoPB/20220122172830", {
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/2243651/history
          beatId: 4086301,
          chordId: 2221797,
          repetitiveSegmentId: 2247682,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FRoPB%2F20220122172830
          lyricId: 53718,
          lyricDiffId: 7076
        },
      });

      //↓↓↓再生ボタンをhtmlファイルとリンクさせる
      document.querySelector("#play").addEventListener("click",()=>{
        player.video && player.requestPlay();
      });

      //↓↓↓停止ボタンをhtmlファイルとリンクさせる
      document.querySelector("#stop").addEventListener("click",()=>{
        player.video && player.requestStop();
      });
		}
	},

  //↓↓↓動画が再生出来るようになったら曲名とアーティスト名を取得,htmlファイルとリンクさせてテキストコンテンツとして表示
  onVideoReady:(v)=>{
    document.querySelector("#song_name").textContent=player.data.song.name;
    document.querySelector("#song_artist").textContent=player.data.song.artist.name;
  },

  //↓↓↓時間が更新されるごとにその時間における歌詞情報を取得,htmlファイルとリンクさせてテキストコンテンツとして表示
  onTimeUpdate:(position)=>{
    document.querySelector("#lyrics_char").textContent=player.video.findChar(position).text;
  }
});