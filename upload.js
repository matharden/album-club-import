const firebase = require("./node_modules/firebase");
const admin = require("./node_modules/firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const data = require("./data.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://album-club-e99d2.firebaseio.com"
});

const hosts = {
  neil: 'PUoblpUIW017vbJGg8on',
  john: 'PuXdNQpZVb5OSfO1maeB',
  mat: 'VVW4rbkwaWgUh18SsfMt',
  bill: 'XpNQCa9ckSiegFmovMzG',
  wendy: 'ZJAeoLfNQPzLrBr32W7u',
  matt: 'epIr5aGGwQxUhXXdDaoW',
  nick: 'kwX53X5AQET0k4SvuRah',
  dan: 'mUJUz8yRrfjpaCzqPuRE',
  tim: 'ns1pQb4CmgZwmrl4JmnX',
  ed: 'uh9uKPeAQ4i8KvNX29RB',
  andrew: 'vzRVqW2iVNddES3gcuE1'
};

data && Object.keys(data).forEach(key => {
  const nestedContent = data[key];

  if (typeof nestedContent === "object") {
    Object.keys(nestedContent).forEach(i => {
      const album = nestedContent[i];
      const docId = 100 - i;
      admin.firestore()
        .collection(key)
        .doc(`${docId}`)
        .set({
          number: docId,
          ratings: 0,
          avgRatings: 0,
          artist: album.artist,
          title: album.title,
          host: 'hosts/' + hosts[album.host.toLowerCase()],
          playedOn: admin.firestore.Timestamp.fromDate(new Date(album.played_on))
        })
        .then((res) => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  }
});
