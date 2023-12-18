import {Datepicker, Dropdown, Input, Modal} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {estimationTypeOptions} from '../../constants';
import useAssessmentInsert from '../../services/graphQL/assessmentInsert/useAssessmentInsert';
import useGetSettings from '../../services/graphQL/getSettings/useGetSettings';
import {DropdownDataNumber, DropdownDataString} from '../../types/dropdownData';
import {MicroserviceProps} from '../../types/micro-service-props';
import {parseDate, parseDateForBackend} from '../../utils/dateUtils';
import {EstimationForm} from './styles';

interface AssessmentModalProps {
  context: MicroserviceProps;
  onClose: () => void;
  id: number;
  depreciation_type_id: number;
  refetch?: () => void;
}

interface AssessmentModalForm {
  type: DropdownDataString;
  gross_price_difference: string;
  date_of_assessment: Date | undefined;
  gross_price_new: string;
  estimated_duration: string;
  residual_price: string;
}

const AssessmentModal = ({context, onClose, id, depreciation_type_id, refetch}: AssessmentModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    control,
  } = useForm<AssessmentModalForm>({
    defaultValues: {
      type: estimationTypeOptions[0],
      gross_price_difference: '',
      date_of_assessment: undefined,
      estimated_duration: '',
      gross_price_new: '',
      residual_price: '',
    },
  });

  const {alert} = context;
  const user_profile_id = context.contextMain.user_profile_id || 1;

  const {options: depreciationTypeOptions} = useGetSettings({entity: 'deprecation_types'});

  const {mutate, loading: isSaving} = useAssessmentInsert();

  const onAddEstimation = async (data: AssessmentModalForm) => {
    if (isValid && !isSaving) {
      await mutate(
        {
          depreciation_type_id: depreciation_type_id,
          gross_price_difference: parseFloat(data.gross_price_difference),
          gross_price_new: 0,
          date_of_assessment: data?.date_of_assessment && parseDateForBackend(data?.date_of_assessment),
          inventory_id: Number(id),
          type: data?.type?.id,
          estimated_duration: Number(data?.estimated_duration) || 0,
          // This tells which is the last (active) assessment
          active: true,
          user_profile_id,
          residual_price: parseFloat(data.residual_price),
        },
        () => {
          alert.success('Procjena uspješno dodana');
          refetch && refetch();
          onClose();
        },
        () => {
          alert.error('Greška prilikom dodavanja procjene');
        },
      );
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="DODAJ PROCJENU"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onAddEstimation)}
      rightButtonText="Dodaj procjenu"
      leftButtonText="Otkaži"
      buttonLoading={isSaving}
      content={
        <EstimationForm>
          <Controller
            name="type"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={estimationTypeOptions}
                label="TIP PROCJENE:"
                isRequired
                error={errors.type?.message}
                isDisabled={true}
              />
            )}
          />
          <Input
            {...register('gross_price_difference', {required: 'Ovo polje je obavezno'})}
            label="VRIJEDNOST PROCJENE:"
            isRequired
            error={errors.gross_price_difference?.message}
            type="number"
            rightContent={<div>€</div>}
          />
          <Input
            {...register('residual_price', {required: 'Ovo polje je obavezno'})}
            label="REZIDUALNA VRIJEDNOST:"
            isRequired
            error={errors.residual_price?.message}
            type="number"
            rightContent={<div>€</div>}
          />
          <Input
            {...register('estimated_duration', {required: 'Ovo polje je obavezno'})}
            label="VIJEK TRAJANJA:"
            isRequired
            error={errors.estimated_duration?.message}
          />
          <Controller
            name="date_of_assessment"
            control={control}
            rules={{required: 'Ovo polje je obavezno'}}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                onChange={onChange}
                label="DATUM PROCJENE:"
                name={name}
                selected={value ? new Date(value) : ''}
                isRequired
                error={errors.date_of_assessment?.message}
              />
            )}
          />
        </EstimationForm>
      }
    />
  );
};

export default AssessmentModal;
