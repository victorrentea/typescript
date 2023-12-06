     
  /**
   * Context: functia de mai jos e folosit pentru randare o lista de checkbox-uri sau radio buttons
   * E mult mult prea comlexa pentru ce ar trebui ea sa faca
   * button.cssClass === PARAMETERS_LIST - if-uri dupa clase de css
   * { marginLeft: '-24px', width: 'calc(100% + 48px)' } - inline CSS
   */
    
 
 generateSections = (section: SectionContainer, index: number, items: Array<any>) => {
    const group = this.actionBoxData.groups?.find(item => item.members.includes(section.id));
    const cssClasses = section.buttonsArray[0]?.cssClass === 'checkbox_critical' ? ['bottom-content', 'critical-checkboxes'] : ['bottom-content'];
    
    const sectionButtons =
      section.buttonsArray &&
      section.buttonsArray.map((button: ButtonItem, index: number) => {
        let content = null;
        if (button.cssClass.includes(SIMPLE_CHECKBOX)) {
          content = (
            <Fragment>
              <checkbox-component
                translation={this.translation}
                elementHallow={this.elementHallow}
                elementId={button.elementId}
                typeCheckbox={button.cssClass}
                value={this.checkBoxesSelected.find(item => item.name === button.elementId).value}
                changeAction={this.onCheckboxSelected(button.elementId)}
                label={button.label}
                additionalLabel={button.additionalLabel}
              />
              {button.cssClass === 'checkbox_critical' && index < section.buttonsArray.length - 1 && <hr class="vertical-separator-dashed" />}
            </Fragment>
          );
        } else if (button.cssClass.includes(RADIO_BUTTON)) {
          content = (
            <radio-component
              translation={this.translation}
              isHallow={this.elementHallow === button.elementId}
              tooltipText={button.tooltipString}
              label={button.label}
              isSelected={group ? group.selectedAction?.elementId === button.elementId : false}
              typeCss={button.cssClass}
              enabled={this.buttonEnabledCondition(button)}
              clickAction={this.onCommandSelected(button)}
              buttonData={button}
            />
          );
        } else if (button.cssClass === CRITICAL_LABEL) {
          content = (
            <div style={{ marginLeft: '-24px', width: 'calc(100% + 48px)' }}>
              <critical-label buttonLabel={button.type} firstLine={button.label} secondLine={button.additionalLabel} translation={this.translation} />
            </div>
          );
        } else if ([TRAIN_TIME_PICKER, TRAIN_NUMBER_INPUT, TVP_SECTION].includes(button.cssClass)) {
          content = <input-component trainInput={button} translation={this.translation} trainSection={section} changeFormValidate={this.changeFormValidate} />;
        } else if (button.cssClass === DELETE_SECTION) {
          content = (
            <div class="remove-train-container">
              {this.translation(button.label)}: <b class="remove-train-data">{button.value}</b>
            </div>
          );
        } else if (button.cssClass === 'inline-label') {
          content = (
            <p class="inline-label" style={button.style} id={button.apiValue}>
              {button.defaultValue}
            </p>
          );
        } else if (button.cssClass === PARAMETERS_LIST) {
          content = <parameters-list params={button.params} order={button.order} translation={this.translation}></parameters-list>;
        } else {
          if (button.type !== 'element') {
            content = (
              <div key={`section-${section.id}-button-${button.elementId}`} class={section.cssClass}>
                <button-component
                  translation={this.translation}
                  isHallow={this.elementHallow === button.elementId}
                  tooltipText={button.tooltipString}
                  label={button.label}
                  isSelected={group ? group.selectedAction?.elementId === button.elementId : false}
                  typeCss={button.cssClass}
                  enabled={this.buttonEnabledCondition(button)}
                  clickAction={this.onCommandSelected(button)}
                />
              </div>
            );
          }
        }
        return content;
      });

    if (section.cssClass === TRAIN_ELEMENTS) {
      cssClasses.push('display-train-section');
    }

    if (section.label) {
      cssClasses.push('display-flex');
    }
    if (section.id === LOGS_SECTION && (section as SafetyLogsSection).shouldRender) {
      return (
        <div>
          <feedback-logs logs={section.logs} translation={this.translation} />
          <hr class="vertical-separator" />
        </div>
      );
    }
    return (
      <div>
        <div key={`section-${section.id}`} class={cssClasses.join(' ')} style={section.style}>
          {section.label && <div class="section-container">{translate(section.label, this.translation)}</div>}
          {sectionButtons}
        </div>
        {items.length - 1 !== index && section.buttonsArray?.length !== 0 && <hr class="vertical-separator" />}
      </div>
    );
  };
