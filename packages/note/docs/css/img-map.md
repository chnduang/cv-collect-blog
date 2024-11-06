# img-map
```js
      <img
        className={styles['open-banner']}
        style={{ width: '100%' }}
        src={BannerImg}
        alt="open-source"
        onClick={() => window.open(OpenLink.HOME_LINK)}
        useMap="#openmap"
      />
      <map name="openmap" id="planetmap">
        <area
          shape="rect"
          coords="179,344,342,392"
          href={`${HandHost}/market-home/detail/29?from=myProduct`}
          alt="open-source"
          target="_blank"
        />
      </map>
```

