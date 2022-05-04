import { useState } from "react";
import bug from '../../assets/bug.svg';
import ideia from '../../assets/ideia.svg';
import other from '../../assets/outro.svg';
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  bug: {
    title: 'Problema',
    image: {
      source: bug,
      alt: 'Imagem de um inseto'
    }
  },
  ideia: {
    title: 'Ideia',
    image: {
      source: ideia,
      alt: 'Imagem de uma lâmpada'
    }
  },
  other: {
    title: 'Outro',
    image: {
      source: other,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSend(false)
    setFeedbackType(null);
  }

  return (

    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {feedbackSend ? (
        <FeedbackSucessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      )}

      <footer>
        Feito com ❤️ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div >
  )
}