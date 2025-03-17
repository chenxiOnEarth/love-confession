请在此文件夹中放入你喜欢的浪漫音乐文件，并命名为 love-song.mp3

如果你想使用其他文件名或格式，请记得在 index.html 文件中相应地修改音乐文件路径。

例如，如果你的音乐文件是 my-love-song.mp3，请修改 index.html 中的以下行：
<audio id="background-music" loop>
    <source src="music/love-song.mp3" type="audio/mp3">
</audio>

改为：
<audio id="background-music" loop>
    <source src="music/my-love-song.mp3" type="audio/mp3">
</audio> 