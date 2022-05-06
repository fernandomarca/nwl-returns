import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { theme } from '../../theme';
import { styles } from './styles';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbacksend, setFeedbackSend] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }
  function handlRestartFeedback() {
    setFeedbackSend(false);
    setFeedbackType(null);
  }
  function handleFeedbackSent() {
    setFeedbackSend(true);
  }

  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        style={styles.button}
      >
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbacksend ?
            <Success
              onSendAnotherFeedback={handlRestartFeedback}
            />
            :
            <>
              {
                feedbackType ?
                  <Form feedbackType={feedbackType}
                    onFeedbackCanceled={handlRestartFeedback}
                    onFeedbackSent={handleFeedbackSent}
                  />
                  :
                  <Options
                    onFeedbackTypeChanged={setFeedbackType}
                  />
              }
            </>
        }
      </BottomSheet>


    </>
  );
}
export default gestureHandlerRootHOC(Widget);