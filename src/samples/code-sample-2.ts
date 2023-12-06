 
  componentWillLoad() {
    // I18n
    // to be used on local
    // this.fallbackUrl = "../../data/i18n.json"; // Custom i18n resources
    this.fallbackUrl = "node_modules/gdp-ui-playback-mgr/dist/gdp-ui-playback-mgr/data/i18n.json"; // Custom i18n resources
    const uiPage = document.querySelector('gdp-ui-page');
    this.i18nMissing = (uiPage as any).i18nMissing;
    this.store && (this.localizeBehavior = new LocalizeBehavior(this as any));
    this.localizeBehavior.loadLocalResources();
    this.playbackService = new PlaybackService(uiPage);
    this.displayNoLogsElement = true;
    this.displayApplicativeTimeLogs = false;

    document.addEventListener("widget-maximized", this._onMaximizedChanged.bind(this));
    this._initComponent();
    this._loadData();
    try {
      this.widgetHeaderTitle = document.querySelector("body > gdp-ui-page").shadowRoot.querySelector("#dashboard").shadowRoot.querySelector("#gdp-ui-playback-mgr").shadowRoot.querySelector("#wrapper > div.widget-header-wrapper > div > div.widget-header-title") as any;
    } catch (error) {
      console.error(error)
    }
  }

  async _initComponent() {
    this.playbackService.onPlaybackChange(this._onActivePlaybackChange.bind(this))
    this.playbackService.onMessageLogReceived(this._onPlaybackLogsReceive.bind(this))

    let speedArray = [{ name: '0.5x Half' }, { name: '1x Normal' }];
    let speedsObject = { '0.5x Half': 0.5, '1x Normal': 1 };

    await this.playbackService.getPlaybackProperties()
      .then(playbackProperties => {
        const maximumSpeed = playbackProperties.maximumSpeed;
        for (let i = 2; i <= maximumSpeed; i++) {
          speedArray.push({ name: (i + "x") });
          speedsObject[i + "x"] = i;
        }
        this.speedLabels = speedArray;
        this.speeds = speedsObject;
        this.maximumImportFileSize = this.parseFileSize(playbackProperties.maximumFileSize);
      })
      .catch(() => {
        this._displayToast("GDP.gdp-ui-playback-manager.errorInitialize.shortText", "error");
      });

    await this.playbackService.getFeatures()
      .then(items => {
        let features = [];
        items.forEach(item => features.push({ value: item, label: item }));
        this.features = features;
      })
      .catch(() => {
        this._displayToast("GDP.gdp-ui-playback-manager.errorInitialize.shortText", "error");
      });

    this.playbackService.getPlaybackConfiguration()
      .then(playbackConfiguration => {
        this._onActivePlaybackChange(playbackConfiguration);
      })
      .catch(() => {
        this._displayToast("GDP.gdp-ui-playback-manager.errorInitialize.shortText", "error");
      });
  }

  parseFileSize(sizeString) {
    var size = sizeString.match(/\d/g);
    size = size.join("")
    return size;
  }