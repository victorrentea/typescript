
/**
 * Context: functia de mai jos se apeleaza cand se da click pe elemente/svg dintr-un canvans
 * In functie daca mai sunt deja "modale deschise" sau nu - ar trebui sa deschida Modalul principal sau sa arunce eraore 
 * Aditional, mai proceseaza datele + pune timere + face disable la click
 */

const RIGHT_CLICK_BUTTON = 2; // constants over magic numbers!

function onLineOverviewClick(e: any, elementsClicked: Array<any>) {
  if (e && e.data.button == RIGHT_CLICK_BUTTON) {
    this.setDisabledClick(false);
    return;
  }

  // I want to manage only the first element (on top)
  let elementOfInterest = this.filterSelectableElement(elementsClicked);

  if (elementOfInterest) {
    // Check for CTRL key
    if (e && e.data.originalEvent.ctrlKey === true) {
      // Check if action-box is opened
      if (this.$.actionBox.openModal === true) {
        this.$.snackbar.sendWarningToastStacked("closeActionBox");
        this.setDisabledClick(false);
        return;
      } else {
        // If action-box is not opened
        // If the selected element is already selected
        if (elementsClicked[0].selected === true) {
          this.$.dynamicTooltip.close();
        } else {
          // If there is an element that was previously selected in dynamic-tooltip and if it's name is not equal to the elementOfInterest name and if dynamic-tooltip is opened
          if (
            this.$.dynamicTooltip.lastElementSelected &&
            elementOfInterest.name !==
            this.$.dynamicTooltip.lastElementSelected.name &&
            this.$.dynamicTooltip.isOpened === true
          ) {
            this.handleUserSelection(
              this.$.dynamicTooltip.lastElementSelected,
              "userselection",
              false
            );
          }
          this.openDynamicTooltip(elementOfInterest);
        }
        this.manageTooltipSelection(this.lastElementSelected, true);
      }
      return;
    }
    // I want manage logical and phisical selection
    if (this.$.dynamicTooltip.isOpened === true) {
      this.$.snackbar.sendWarningToastStacked("closeTooltip");
      this.setDisabledClick(false);
      return;
    } else {
      this.handleUserSelection(elementOfInterest, "userselection", true);
      if (elementOfInterest.type === WORKING_AREA ||
        elementOfInterest.type === LOCAL_OPERATION_AREA) {
        this.idrsServices?.additionalContentChange(
          this,
          elementOfInterest.name,
          elementOfInterest.selected
        );
      }
    }

    let elementsFound = [...this.selectedObjects.values()];
    this.lastSelectedElements = elementsFound.map((item) => item.name);
    this.UIStore.dispatch(loadElements());
    if (
      this.nextClickClearSelection &&
      destinationSignals &&
      destinationSignals.length
    ) {
      this.nextClickClearSelection = false;
      const newSelection = [...elementsFound.map((item) => item.name)];
      this.unselectElements(destinationSignals, null);
      this.selectElements(newSelection, "userselection", true);
    }

    // First check is the elements are "alive"
    saveElementsForTimer(elementsFound);
    for (const element of elementsFound) {
      const {
        allowCmds,
        disableOrTrainClick,
        isElementILAlive,
      }: {
        allowCmds: boolean;
        disableOrTrainClick: boolean;
        isElementILAlive: boolean;
      } = this.stlHeartbeatComponent.isElementAlive(
        element.name,
        element.type
      );

      this.elementNotAliveLabel = computeElementLabel(
        this.idrsServices?.allObjectsById[element.name]
      );
      if (!allowCmds && !isElementILAlive && !disableOrTrainClick) {
        // If one element is dead(not connected) from selection show error and clear
        this.$.snackbar.sendErrorToastStacked(ELEMENT_IS_NOT_ALIVE);
        this.elementNotAliveLabel = "";
        this.unselectElements(null, null);
        this.openModal && (this.openModal = false);
        this.setDisabledClick(false);
        return;
      } else if (allowCmds && !isElementILAlive && !disableOrTrainClick) {
        this.$.snackbar.sendWarningToastStacked(ELEMENT_IS_NOT_ALIVE);
        this.elementNotAliveLabel = "";
        // In this case we don't want to return from fn because we need to open cmdbox
      }
      // Note: If we have other cases, the action-box will open with no error.
    }
    if (elementsFound.length) {
      for (let i = 0; i < elementsFound.length; i++) {
        let elementFound = elementsFound[i];
        let trainInfo: TrainInfo | undefined = this.trainInfoMap.get(
          elementFound.name
        );
        if (trainInfo) {
          elementFound.objectInfo = trainInfo;
          elementFound.name =
            trainInfo.type.toLowerCase() + ":" + elementFound.name;
          if (i == 0) {
            const birthId = trainInfo.berthId;
            const {
              relatedTrackElement,
            } = this.idrsServices?.objectByDescriptionField[birthId];
            const trackElement = this.idrsServices?.allObjectsById[
              relatedTrackElement
            ];
            if (trackElement.descriptionFieldStack) {
              const nameArr: string[] = elementFound.name.split(":");
              nameArr[0] = nameArr[0] + "Stack";
              elementFound.name = nameArr.join(":");
            }
          }
        }
      }
    }
    if (
      elementsFound.length &&
      LIST_OF_ERRORS_INDICATOR === elementsFound[0].type
    ) {
      this.actionRouter.route(LIST_OF_ERRORS_INDICATOR, {
        selectedObjects: elementsFound[0],
      });
      return;
    }
    if (!this.levelOfDetailInfo) return;
    if (this.selectedObjects.size === 0) {
      this.lsbridge.send(ACTION_BOX_EVENT + this.UUID, "no_element_selected");
      this.setDisabledClick(false);
      return;
    }
    this.actionHandlerProcessor.handleClickAction(
      createCallbackUrl(elementsFound),
      "GET",
      null,
      null,
      this.onActionListSuccess(elementsFound),
      this.onActionListFailure
    );
  } else {
    this.setDisabledClick(false);
  }

  function createCallbackUrl(elementsFound): any {
    return this.commandListDataSource + "?" + elementsFound.map((item) => `ids=${item.name}`).join("&");
  }
}