import { useMonoSynth } from "./MonoSynthContext";

export const TestButton = () => {
  const { synth } = useMonoSynth();

  const handleOnClick = () => {
    synth?.triggerAttackRelease("C3", "4n");
  };
  return (
    <>
      <button onClick={handleOnClick}>test</button>
    </>
  );
};
