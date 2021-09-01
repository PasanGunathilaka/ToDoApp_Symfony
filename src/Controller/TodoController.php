<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

 /**
     * @Route("/api/todo", name="todo")
     */

class TodoController extends AbstractController
{
    private $entityManager;
    private $todoReposatary;

    public function __construct(EntityManagerInterface $entityManager,TodoRepository $todoReposatary)
            {
                $this->entityManager =  $entityManager;
                $this->todoReposatary =  $todoReposatary;
            }

    /**
     * @Route("/read", name="todo")
     */
    public function index(): Response
    {
     $todos = $this->todoReposatary->findAll();

     $arrayofTodos =[];
     foreach ($todos as $todo){
        $arrayofTodos[] = $todo->toArray();
     }

     return $this->json($arrayofTodos);

    }
}
