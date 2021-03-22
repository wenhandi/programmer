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



function useCurrentFolderData(networkState) {
    // ...
}

function useFolderNavigation({ networkState, currentFolderData }) {
    // ...
}

function useFavoriteFolder(currentFolderData) {
    // ...
}

function useHiddenFolders() {
    // ...
}

function useCreateFolder(openFolder) {
    // ...
}

export default {
    setup() {
        // Network
        const { networkState } = useNetworkState();

        // Folder
        const { folders, currentFolderData } = useCurrentFolderData(networkState);
        const folderNavigation = useFolderNavigation({ networkState, currentFolderData });
        const { favoriteFolders, toggleFavorite } = useFavoriteFolders(currentFolderData);
        const { showHiddenFolders } = useHiddenFolders();
        const createFolder = useCreateFolder(folderNavigation.openFolder);

        // Current working directory
        resetCwdOnLeave();
        const { updateOnCwdChanged } = useCwdUtils();

        // Utils
        const { slicePath } = usePathUtils();

        return {
            networkState,
            folders,
            currentFolderData,
            folderNavigation,
            favoriteFolders,
            toggleFavorite,
            showHiddenFolders,
            createFolder,
            updateOnCwdChanged,
            slicePath,
        };
    },
};