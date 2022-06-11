import { FC } from "react";
import { useForm } from "react-hook-form";
import { ICreateAgent } from "../../types/Agent";

const CreateAgent: FC<ICreateAgent> = ({ submitAgent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => submitAgent(data);
  return (
    <div>
      <h5 className="text-xl">Create An Agent</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-row my-2">
          <input
            className="custom-input mx-1 w-1/2"
            {...register("firstName", { required: true })}
            placeholder="First Name"
          />
          <input
            className="custom-input mx-1 w-1/2"
            {...register("lastName", { required: true })}
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row">
          {errors.firstName && (
            <span className="mx-1 w-1/2 text-red-500">
              First name is required
            </span>
          )}
          {errors.lastName && (
            <span className="mx-1 w-1/2 text-red-500">
              Last name is required
            </span>
          )}
        </div>
        <div className="flex  my-2">
          <input
            className="custom-input mx-1 w-full"
            {...register("photoUrl")}
            placeholder="Photo Url"
          />
        </div>
        <div className="flex my-2">
          <input
            className="custom-input mx-1 w-1/2"
            {...register("agentLicense", { required: true })}
            placeholder="Agent License"
          />
          <input
            className="custom-input mx-1 w-1/2"
            {...register("address", { required: true })}
            placeholder="Address"
          />
        </div>
        <div className="flex flex-row">
          {errors.agentLicense && (
            <span className="mx-1 w-1/2 text-red-500">
              Agent License is required
            </span>
          )}
          {errors.address && (
            <span className="mx-1 w-1/2 text-red-500">Address is required</span>
          )}
        </div>
        <div className="flex my-2">
          <input
            className="custom-input mx-1 w-full"
            {...register("practiceAreas")}
            placeholder="Practice Areas"
          />
        </div>
        <div className="flex my-2">
          <textarea
            className="custom-input mx-1 w-full"
            {...register("aboutMe")}
            placeholder="About Me"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value={'join the team'}
            className="text-base bg-gray-400 rounded-lg max-w-[100px] p-2 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAgent;
