import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Modal from "react-modal";

import { useDebounce } from "../hooks/useDebounce";
import { ICreateLeadDTO } from "../types/Leads";
import LeadService from "../shared/services/leads";
import AffiliationService from "../shared/services/affiliations";

import ValidateCreateLead from "../utils/validation/create-lead";
import Loader from "../shared/components/Loader";

const formFields: {
  key: keyof ICreateLeadDTO;
  label: string;
  placeholder?: string;
  type?: string;
}[] = [
  { key: "first_name", label: "First Name", placeholder: "e.g. John" },
  { key: "last_name", label: "Last Name", placeholder: "e.g. Smith" },
  { key: "email", label: "Email", placeholder: "e.g. example@domain.com" },
  { key: "state", label: "State", placeholder: "e.g. NY" },
  { key: "affiliation", label: "Affiliation", type: "select" },
];

const initialValues: ICreateLeadDTO = {
  first_name: "",
  last_name: "",
  email: "",
  state: "",
  affiliation: "",
  role: "user",
  status: "pending",
};

Modal.setAppElement("#modal");

export default function LeadsPage() {
  const [state, setState] = useState(initialValues);
  const [isOpen, setIsOpen] = useState(false);
  const [affiliations, setAffiliations] = useState([]);

  const createLeadMutation = useMutation((dto: ICreateLeadDTO) =>
    LeadService.createLeadHandler(dto)
  );

  const getAffiliationsMutation = useMutation(
    (state_short: string) => {
      return AffiliationService.getAffiliationsHandler(state_short);
    },
    {
      onSuccess: ({ data }) => {
        const { data: affiliation } = data;
        setAffiliations(affiliation);
      },
    }
  );

  const debouncedState = useDebounce(state.state, 1000);
  useEffect(() => {
    if (debouncedState && debouncedState.length > 0)
      getAffiliationsMutation.mutate(debouncedState);
  }, [debouncedState]);

  const handleOnChange = (e: any, value: keyof ICreateLeadDTO) => {
    const target = e.target.value;

    setState((prevState) => ({
      ...prevState,
      [value]: target,
    }));
  };

  const handleOpenModal = (e: any) => {
    e.preventDefault();

    // check if form is valid
    if (isFormValid()) {
      setIsOpen(true);
    }
  };

  const handleOnSubmit = async () => {
    try {
      await createLeadMutation.mutateAsync(state);
    } catch (e) {
      console.error("Leads:", e);
    } finally {
      setIsOpen(false);
    }
  };

  const isFormValid = () => {
    const validation = ValidateCreateLead(state);
    if (!validation) {
      const error = ValidateCreateLead.errors![0] as unknown as Record<
        string,
        unknown
      >;
      toast(errorMessage(error), { type: "error" });
      return false;
    }
    return true;
  };

  const errorMessage = (error: Record<string, unknown>) => {
    const { instancePath, message } = error as {
      instancePath: string;
      message: string;
    };
    const [, path] = instancePath.split("/");
    return `${path} ${message}`;
  };

  const handleResetMutation = () => {
    createLeadMutation.reset();
  };

  if (getAffiliationsMutation.isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-between items-center">
      <h1 className="text-5xl text-gray-500 font-bold mb-10">Create Lead</h1>

      {createLeadMutation.isError && (
        <div
          className="w-72 p-2 mb-3  bg-red-400 text-white rounded-lg text-sm"
          onClick={handleResetMutation}
        >
          Error while creating lead
        </div>
      )}

      {createLeadMutation.isSuccess && (
        <div
          className="w-72 p-2 mb-3 bg-emerald-500 text-white rounded-lg text-sm"
          onClick={handleResetMutation}
        >
          Your account has been submitted to AFSCME for review
        </div>
      )}

      <form onSubmit={handleOpenModal}>
        {formFields.map((field, index) => (
          <div className="p-2 flex flex-col gap-1" key={index}>
            <label className="font-sans text-gray-600 text-lg">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                defaultValue={"default"}
                className="p-2 w-72 rounded-lg outline-none bg-gray-300 text-gray-800 disabled:cursor-not-allowed"
                onChange={(event) => handleOnChange(event, field.key)}
                disabled={!affiliations.length}
              >
                <option value="default">Select</option>
                {affiliations.map((item, index) => (
                  <option key={index} value={item["affiliation"]}>
                    {item["affiliation"]}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={state[field.key]}
                onChange={(event) => handleOnChange(event, field.key)}
                placeholder={field.placeholder}
                className="p-2 w-72 rounded-lg outline-none bg-gray-300 text-gray-800"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="m-2 p-2 w-72 bg-emerald-500 text-white font-bold tracking-wider rounded-lg"
        >
          Submit
        </button>
      </form>
      <Modal
        isOpen={isOpen}
        style={{
          content: {
            height: "25rem",
          },
        }}
      >
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="text-5xl text-gray-500 font-bold mb-10">Confirm?</h1>
            <h1
              className="text-2xl font-sans p-2 rounded-full w-12 h-12 bg-gray-500 text-white font-bold mb-10 text-center"
              role={"button"}
              onClick={() => setIsOpen(false)}
            >
              X
            </h1>
          </div>

          <div className="p-2">
            <p className="text-gray-600 text-lg">Here are your details</p>
            <div className="my-4">
              {formFields.map((field, index) => (
                <p key={index} className="text-gray-600">
                  <span className="font-bold">{field.label}</span>:{" "}
                  {state[field.key]}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full text-center">
            <button
              className="m-2 p-2 w-72 bg-emerald-500 text-white font-bold tracking-wider rounded-lg"
              onClick={handleOnSubmit}
              disabled={createLeadMutation.isLoading}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
