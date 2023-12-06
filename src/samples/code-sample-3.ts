/* 
  Switch world
  Ficare import din acesta este un const formAcEdit = {...Config obj}
  Codul asta ar merge mai mult pe partea de "Refactor"
*/

import {
  formAcEdit,
  formACGenericEdit,
  formAcInsert,
  formTrainRunEdit,
  formOffPPScheduleInsert,
  formOffPPScheduleEdit,
  formOffPPScheduleCopy,
  formIEInsert,
  formIEEdit,
  layoutAcPossessionInsert,
  layoutAcPossessionEdit,
  layoutTsrInsert,
  layoutTsrEdit,
  layoutAcWorkingAreaInsert,
  layoutAcWorkingAreaEdit,
  layoutAcUnavailableElemInsert,
  layoutAcUnavailableElemEdit,
  layoutTsaInsert,
  layoutTsaEdit,
  layoutAcCatenaryDisconnectEdit,
  layoutAcCatenaryDisconnectInsert,
  layoutAcDuplicateWorkingArea,
  layoutAcDuplicateTsa,
  layoutAcDuplicateUnavailableElements,
  layoutAcDuplicateTsr,
  layoutAcDuplicatePossession,
  layoutAcDuplicateCatenary
} from './layouts/allLayouts.js';

getLayoutForm() {
    this.canBeDuplicated = true;

    switch (this.layoutType) {
      case 'onpp-ac-duplicate':
        this.method = 'POST';

        // Behind the scene mandatory properties for duplication
        this.mdfValues.availabilityConstraintNo = this.initialValues.availabilityConstraintNo;
        this.mdfValues.opDay = this.initialValues.opDay;

        switch (this.formTypeDropdownValue) {
          case 0: // possession
            if (!this.isChild) {
              this.createGroupId();
            }
            return layoutAcDuplicatePossession;
          case 1: // workingAreas
            return layoutAcDuplicateWorkingArea;
          case 2: // catenaryDisconnect
            return layoutAcDuplicateCatenary;
          case 3: // temporaryShuntingArea
            return layoutAcDuplicateTsa;
          case 4: // unavailableElement
            return layoutAcDuplicateUnavailableElements;
          case 5: // temporarySpeedRestriction
            return layoutAcDuplicateTsr;
        }
      case 'onpp-ac-insert':
        this.method = 'POST';

        switch (this.formTypeDropdownValue) {
          case 0: //possession
            if (!this.isChild) {
              this.createGroupId();
            }
            return layoutAcPossessionInsert;
          case 1: //workingAreas
            this.canBeDuplicated = false;
            return layoutAcWorkingAreaInsert;
          case 2: //catenaryDisconnect
            this.canBeDuplicated = false;
            return layoutAcCatenaryDisconnectInsert;
          case 3: //temporaryShuntingArea
            return layoutTsaInsert;
          case 4: //unavailableElement
            this.mdfValues.groupId = '';
            return layoutAcUnavailableElemInsert;
          case 5: //temporarySpeedRestriction
            return layoutTsrInsert;
        }
      case 'onpp-ac-edit':
        this.method = 'POST';
        switch (this.formTypeDropdownValue) {
          case 0: //possession
            return layoutAcPossessionEdit;
          case 1: //workingAreas
            return layoutAcWorkingAreaEdit;
          case 2: //catenaryDisconnect
            return layoutAcCatenaryDisconnectEdit;
          case 3: //temporaryShuntingArea
            return layoutTsaEdit;
          case 4: //unavailableElement
            return layoutAcUnavailableElemEdit;
          case 5: //temporarySpeedRestriction
            return layoutTsrEdit;
        }
      case 'itg-ac-edit':
        this.method = 'PUT';
        return formAcEdit;
      case 'onpp-ac-generic':
        this.method = 'PUT';
        return formACGenericEdit;
      case 'onpp-ie-insert':
        this.method = 'POST';
        return formIEInsert;
      case 'onpp-ie-generic':
        this.method = 'PUT';
        return formIEEdit;
      case 'onpp-generic':
        this.method = 'PUT';
        return formTrainRunEdit;
      case 'offpp-insert':
        this.method = 'POST';
        return formOffPPScheduleInsert;
      case 'offpp-generic':
        this.method = 'PUT';
        return formOffPPScheduleEdit;
      case 'offppcopy-insert':
        this.method = 'POST';
        return formOffPPScheduleCopy;
      case 'itg-ac-insert':
        this.method = 'POST';
        return formAcInsert;
    }
  }