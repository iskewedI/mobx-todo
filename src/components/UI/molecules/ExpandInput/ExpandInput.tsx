import { useState } from 'react';
import Fade from '@mui/material/Fade';
import FormInput from '../FormInput/FormInput';
import FabIcon from '../../atoms/FabIcon/FabIcon';
import Plus from '../../../../static/images-svg/Plus.svg';
import './ExpandInput.css';

const ExpandInput = ({ onSubmit }: ExpandInputProps) => {
  const [expanded, setExpanded] = useState<boolean>();

  return (
    <div className='expand-input'>
      <FabIcon icon={Plus} title='Add' onClick={() => setExpanded(!expanded)} />

      {expanded && (
        <Fade
          in
          timeout={300}
          easing={{
            enter: 'cubic-bezier(.39,.9,.82,.86)',
            exit: 'cubic-bezier(.88,.26,.82,.86)',
          }}
        >
          <div className='expand-input__input'>
            <FormInput title='Add' onSubmit={onSubmit} inputAutofocus={true} />
          </div>
        </Fade>
      )}
    </div>
  );
};

export default ExpandInput;
