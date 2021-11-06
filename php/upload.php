<?php
    /**
     * Authenticate & upload
     */
    if (isset($_POST['password'])) {
        if ($_POST['password'] == 'Bm^9D$@sCEB@kq_zjP5@HLf$t@vU') {
            $file_name    = $_FILES['file']['name'];
            $tmp_name     = $_FILES['file']['tmp_name'];
            $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
            $normalizedFilename = normalizePath($file_name) . '-' . time() . '.' . $extension;
            $file_up_name = $normalizedFilename;

            move_uploaded_file($tmp_name, "../" . $file_up_name);

            echo $normalizedFilename;
        }
    }

    function normalizePath($str, $delimiter = '-')
    {
        $path = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));

        return $path;
    }
?>
