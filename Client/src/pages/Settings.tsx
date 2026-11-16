import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Breadcrumb from "../components/Breadcrumb";
import { useCurrentUser } from "../hooks/useAuth";
import { updateOrganization } from "../api/authApi";

const Settings = () => {
    const queryClient = useQueryClient();
    const { data: user, isPending: loading, isError } = useCurrentUser();
    const [organizationName, setOrganizationName] = useState("");

    useEffect(() => {
        if (user) setOrganizationName(user.organizationName);
    }, [user]);

    const updateOrganizationMutation = useMutation({
        mutationFn: updateOrganization,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
            toast.success("Organization name updated successfully.");
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = organizationName.trim();

        if (!name || name === user?.organizationName) return;

        updateOrganizationMutation.mutate(name);
    };

    if (loading) {
        return <p className="p-8">Loading settings...</p>;
    }

    if (isError || !user) {
        return <p className="p-8">Failed to load settings.</p>;
    }

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <Breadcrumb page="Settings" />

            <h1 className="text-4xl font-medium">Settings</h1>
            <p className="pt-2 text-ring">
                Manage your organization and account preferences.
            </p>

            <section className="mt-8 max-w-2xl rounded-xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold">Organization</h2>
                <p className="mt-1 text-sm text-ring">
                    Update your organization's information.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                    <label
                        htmlFor="organizationName"
                        className="mb-2 block text-sm font-medium"
                    >
                        Organization name
                    </label>

                    <input
                        id="organizationName"
                        type="text"
                        maxLength={100}
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-emerald-500"
                        required
                    />

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={
                                updateOrganizationMutation.isPending ||
                                !organizationName.trim() ||
                                organizationName.trim() === user.organizationName
                            }
                            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {updateOrganizationMutation.isPending ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default Settings;