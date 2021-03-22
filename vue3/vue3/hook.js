function useCreateFolder(openFolder) {
    // originally data properties
    const showNewFolder = ref(false);
    const newFolderName = ref("");

    // originally computed property
    const newFolderValid = computed(() => isValidMultiName(newFolderName.value));

    // originally a method
    async function createFolder() {
        if (!newFolderValid.value) return;
        const result = await mutate({
            mutation: FOLDER_CREATE,
            variables: {
                name: newFolderName.value,
            },
        });
        openFolder(result.data.folderCreate.path);
        newFolderName.value = "";
        showNewFolder.value = false;
    }

    return {
        showNewFolder,
        newFolderName,
        newFolderValid,
        createFolder,
    };
}