import {Input, Modal, Datepicker, FileUpload, Typography} from 'client-library';
import {Controller, useForm} from 'react-hook-form';
import {DeactivationForm} from './styles';
import {parseDate} from '../../utils/dateUtils';
import {useState} from 'react';
import useAppContext from '../../context/useAppContext';

interface DeactivateModalProps {
  onClose: () => void;
  onDeactivate: (data: DeactivationModalForm) => void;
  id?: number;
  loading?: boolean;
}

interface DeactivationModalForm {
  //todo check if string
  inactive: Date;
  description: string;
  file_id: number;
}

const DeactivateModal = ({onClose, onDeactivate, loading}: DeactivateModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const {
    fileService: {uploadFile},
    alert,
  } = useAppContext();

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isValid},
    setValue,
    setError,
    clearErrors,
  } = useForm<DeactivationModalForm>();

  const handleUpload = (files: FileList) => {
    setFiles(files);
    clearErrors('file_id');

    if (files.length > 0) {
      alert.success('Fajl uspješno učitan');
    }
  };

  const onSubmit = async (data: DeactivationModalForm) => {
    if (!files || !files?.length) {
      setError('file_id', {type: 'required', message: 'Ovo polje je obavezno'});

      return;
    }
    console.log(errors);
    if (!isValid) return;

    const formData = new FormData();
    const fileArray = Array.from(files);

    formData.append('file', fileArray[0]);

    await uploadFile(
      formData,
      (res: any) => {
        setFiles(null);
        setValue('file_id', res[0]?.id);
        onDeactivate({...data, file_id: res[0]?.id});
      },
      () => {
        alert.error('Greška pri čuvanju! Fajlovi nisu učitani.');
      },
    );
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title="OTPIS SREDSTVA"
      leftButtonOnClick={onClose}
      rightButtonOnClick={handleSubmit(onSubmit)}
      rightButtonText="Otpiši"
      leftButtonText="Otkaži"
      buttonLoading={loading}
      content={
        <DeactivationForm>
          <Controller
            name="inactive"
            rules={{required: 'Ovo polje je obavezno'}}
            control={control}
            render={({field: {name, value, onChange}}) => (
              <Datepicker
                name={name}
                selected={value ? new Date(value) : ''}
                onChange={onChange}
                options={[]}
                label="DATUM:"
                isRequired
                error={errors.inactive?.message}
              />
            )}
          />
          <Input
            {...register('description', {required: 'Ovo polje je obavezno'})}
            label="OPIS:"
            isRequired
            error={errors.description?.message}
            textarea={true}
          />
          <FileUpload
            icon={<></>}
            variant="secondary"
            onUpload={handleUpload}
            note={<Typography variant="bodySmall" content="Fajl" />}
            buttonText="Dodaj fajl"
            files={files}
            error={errors.file_id?.message as string}
          />
        </DeactivationForm>
      }
    />
  );
};

export default DeactivateModal;
