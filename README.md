Can I change something in brach without getting git lfs error?
# better

<!-- To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime. -->


bash yt-dlp.sh "https://www.youtube.com/watch?v=188PrFLan_A&list=PL5rwmnIfA-Ijoufw-LD2eYBgzNRURq75a" --yes-playlist && cd .. && git add . && git commit -m "playlist downloaded" && git push

```
git config lfs.https://github.com/manfromexistence-better/better.git/info/lfs.locksverify false
git add . && git commit -m "feat: automated commit by manfromexistence from manfromexistence02 account" && git push
bash youtube.sh "https://www.youtube.com/watch?v=188PrFLan_A&list=PL5rwmnIfA-Ijoufw-LD2eYBgzNRURq75a" --yes-playlist && mkdir -p video && mv *.mp4 video/ && git add . && git commit -m "playlist downloaded" && git push
```