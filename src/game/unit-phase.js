

export const UnitPhases = {
  Purple: 'blue',
  Yellow: 'yellow',
};

export const UnitPhaseToColor = {
  [UnitPhases.Purple]: 0xFF0099,
  [UnitPhases.Yellow]: 0x20FF00,
}

export const invert_phase = phase => phase === UnitPhases.Purple ? UnitPhases.Yellow : UnitPhases.Purple;
